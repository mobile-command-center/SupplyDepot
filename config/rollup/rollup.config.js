import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
 
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
        }),
        serve({
            open: true,
            contentBase: ['public'],
            host: 'localhost',
            port: 3000,
        })
    ]
}