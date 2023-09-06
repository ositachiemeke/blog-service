import mysql from 'mysql2/promise';

interface DBMSParams {
    host: string;
    user: string;
    database: string;
    password: string;
}

interface DBMS  {
    connect(): void;
    query(query: string): void;
    connection?: Promise<any>;
}

class MYSQL  implements DBMS  {
    connection?: Promise<mysql.Connection> | undefined;
    options: DBMSParams;
    constructor(options: DBMSParams) {
        this.options = options;
        this.connection =  mysql.createConnection(options);
    }

    connect(): void {
        if(!this.connection){
            this.connection = mysql.createConnection(this.options);
        }
    }

    async query(query: string): Promise<any> {
        if (!this.connection) {
            throw new Error('Not connected to MySQL');
        }

        const connected = await this.connection;

        return connected.query(query);
    }

    async execute<T> (query: string, params: Array<string | number>): Promise<T> {
        if (!this.connection) {
            throw new Error('Not connected to MySQL');
        }

        const connected = await this.connection;

        return connected.execute(query,params) as T;
    }
    
}


const mysqlObj =  new MYSQL({host: process.env.DB_HOST || "127.0.0.1", user: process.env.DB_USERNAME|| "", password: process.env.DB_PASSWORD || "", database:process.env.DB_DATABASE || "" })

export default mysqlObj;