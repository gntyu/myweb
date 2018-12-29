const { resolve } = require('path');

module.exports = {
    //添加自定义路径配置
    //增加loader匹配规则
     module: {
        rules: [
            {
                test: /\.pdf$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'doc/[name].[ext]'
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.css','.pdf'],
        alias: {
            '@': `${__dirname}/src/`,
            '@utils': `${__dirname}/src/utils/`,
            '@common': `${__dirname}/src/components/`
        }
    }
};
