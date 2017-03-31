module.exports = {
    plugins: [
        require('postcss-smart-import')({ /* ...options */ }),
        require('precss')({ /* ...options */ }),
        require('autoprefixer')({ /* ...options */


            browsers: [
                '>1%',
                'last 500 versions',
            ],

        })
    ]
}