import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [
        {
            course_id: 101,
            course_name: "Introduction to Machine Learning",
            lecturer_name: "Lynn Lee",
            cost: 200,
            image: "https://www.classcentral.com/report/wp-content/uploads/2022/04/Artificial-Intelligence-Featured-Image.png",
        },
        {
            course_id: 102,
            course_name: "Advanced Python Programming",
            lecturer_name: "Bob Brown",
            cost: 300,
            image: "https://www.classcentral.com/report/wp-content/uploads/2022/04/Artificial-Intelligence-Featured-Image.png",
        },
    ],
    courses: [
        {
            course_id: 101,
            course_name: "Introduction to Machine Learning",
            lecturer_name: "Lynn Lee",
            cost: 200,
            image: "https://www.classcentral.com/report/wp-content/uploads/2022/04/Artificial-Intelligence-Featured-Image.png",
        },
    ]
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload); 
        },
        removeOrder: (state, action) => {
            state.orders = state.orders.filter(order => order.course_id !== action.payload);
        },
    },
});

export const { addOrder, removeOrder } = userSlice.actions;

export default userSlice.reducer;
