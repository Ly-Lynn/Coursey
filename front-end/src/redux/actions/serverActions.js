import * as serverTypes from "../types/serverTypes";
// import * as userTypes from "../types/userTypes";

export const updateCoursesSuccess = (courses) => ({
	type: serverTypes.UPDATE_COURSES_SUCCESS,
	payload: courses,
});

export const updateCoursesFailure = (err) => ({
	type: serverTypes.UPDATE_COURSES_FAILURE,
	payload: err,
});

export const updateAdsSuccess = (ads) => ({
	type: serverTypes.UPDATE_ADS_SUCCESS,
	payload: ads,
});

export const updateAdsFailure = (err) => ({
	type: serverTypes.UPDATE_ADS_FAILURE,
	payload: err,
});