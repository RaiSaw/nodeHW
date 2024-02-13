export const userSchema = {
    name: {
        isLength: {
            options: {
                min: 3,
                max: 25,
            },
            errorMessage: "Must be at least 3-25 characters",
        },
        notEmpty: {
            errorMessage: "Must not be empty",
        },
        isString: true,
    },
    password: {
        notEmpty: {
            errorMessage: "Must not be empty",
        },
        isString: true,
        isLength: {
            options: {
                min: 8,
                max: 30,
            },
            errorMessage: "Must be at least 8-30 characters",
        },
    },
    email: {
        notEmpty: {
            errorMessage: "Must not be empty",
        },
    }
};
export const schema = {
    title: {
        isLength: {
            options: {
                min: 3,
                max: 25,
            },
            errorMessage: "Must be at least 3-25 characters",
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