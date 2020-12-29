/**
 * 데이터베이스 설정을 담은 파일
 * public Git 공유시 .gitignore에 넣을것!!
 */

module.exports = {
    /**개발서버 */
    development: {
        host: '52.79.40.60',
        user: 'root',
        password: 'vmfhwprxm',
        database: 'youngjaetest',
        connectionLimit: 100
    },
    /**테스트용 */
    test: {
        host: '52.79.40.60',
        user: 'root',
        password: 'vmfhwprxm',
        database: 'youngjaetest',
        connectionLimit: 100
    },
    /**운영서버 */
    production: {
        host: '52.79.40.60',
        user: 'root',
        password: 'vmfhwprxm',
        database: 'schema',
        connectionLimit: 100,
    }
}