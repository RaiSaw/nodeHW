export const userSchema = {
    name: {
        isLength: {
            options: {
                min: 3,
                max: 10,
            },
            errorMessage: "Must be at least 3-10 characters",
        },
        notEmpty: {
            errorMessage: "Must not be empty",
        },
        isString: true,
    },
};
export const schema = {
    title: {
        isLength: {
            options: {
                min: 3,
                max: 10,
            },
            errorMessage: "Must be at least 3-10 characters",
        },
        notEmpty: {
            errorMessage: "Must not be empty",
        },
        isString: true,
    },
    type: {
        notEmpty: {
            errorMessage: "Must not be empty",
        },
        isString: true,
    },
    imgUrl: {
        notEmpty: {
            errorMessage: "Must not be empty",
        },
    },
};