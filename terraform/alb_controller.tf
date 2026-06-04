# 1. Tải Policy và tạo Resource Policy (GIỮ NGUYÊN)
data "http" "alb_iam_policy" {
  url = "https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.5.4/docs/install/iam_policy.json"
}

resource "aws_iam_policy" "alb_controller_policy" {
  name        = "AWSLoadBalancerControllerIAMPolicy-Gryffin"
  policy      = data.http.alb_iam_policy.response_body
  description = "Policy for AWS Load Balancer Controller" # Nên thêm mô tả
}

# 2. Tạo IAM Role (SỬA LẠI ĐỂ DÙNG POLICY Ở BƯỚC 1)
module "lb_role" {
  source    = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version   = "~> 5.30"
  role_name = "eks-alb-controller-role-gryffin"

  # <--- SỬA LẠI: Tắt tính năng tự tạo policy của module
  attach_load_balancer_controller_policy = false

  # <--- THÊM MỚI: Gắn Policy thủ công bạn đã tạo ở trên vào đây
  role_policy_arns = {
    additional = aws_iam_policy.alb_controller_policy.arn
  }

  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["kube-system:aws-load-balancer-controller"]
    }
  }
}

# 3. Cài đặt Helm Chart (TỐI ƯU HÓA)
resource "helm_release" "aws_load_balancer_controller" {
  name       = "aws-load-balancer-controller"
  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"
  namespace  = "kube-system"
  version    = "1.6.2"

  depends_on = [module.eks]

  set {
    name  = "clusterName"
    value = module.eks.cluster_name
  }

  set {
    name  = "serviceAccount.create"
    value = "true"
  }

  set {
    name  = "serviceAccount.name"
    value = "aws-load-balancer-controller"
  }

  set {
    name  = "serviceAccount.annotations.eks\\.amazonaws\\.com/role-arn"
    value = module.lb_role.iam_role_arn
  }

  set {
    name  = "vpcId"
    value = module.vpc.vpc_id
  }

  set {
    name  = "region"
    value = var.region
  }
}
