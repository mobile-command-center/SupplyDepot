import typescript from 'rollup-plugin-typescript2';
 
export default {
    input: './src/index.ts',
    output: {
        file: './dist/index.min.js',
        name: 'index',
        format: 'umd',
        compact: true
    },
    plugins: [
        typescript({
            tsconfig: (process.env.NODE_ENV === 'production') ? 
            './config/typescript/tsconfig.prod.json' : './config/typescript/tsconfig.dev.json'
        })
    ]
}