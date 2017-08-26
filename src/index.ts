import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

export declare interface Lokka {
    mutate<T>(query: string, vars: object): Promise<T>;
    query<T>(query: string, vars: object): Promise<T>;
    watchQuery<T>(query: string, vars: object, handler: (err: boolean, payload: object) => void): Promise<T>;
    refetchQuery<T>(query: string, vars: object): Promise<T>;
    createFragment(fragment: string): string;
}

@Injectable()
export class LokkaProvider<Client extends Lokka> {
    constructor(private client: Client) {
        this.client = client;
    }

    /**
     * @name mutate
     * @param query {string}
     * @param vars {object}
     */
    public mutate<Response>(query: string, vars: object): Observable<Response> {
        return Observable.fromPromise(
            this.client.mutate(query, vars)
        );
    }

    /**
     * @name query
     * @param query {string}
     * @param vars {object}
     */
    public query<T>(query: string, vars: object = {}): Observable<T> {
        return Observable.fromPromise(
            this.client.query(query, vars)
        );
    }

    /**
     * @name query
     * @param query {string}
     * @param vars {object}
     */
    public watchQuery<T>(
        query: string,
        vars: object = {},
        handler: (err: boolean, payload: object) => void): Observable<T> {
            return Observable.fromPromise(
                this.client.watchQuery(query, vars, handler)
            );
    }

    /**
     * @name refetchQuery
     * @param query 
     * @param payload 
     */
    public refetchQuery(query: string, payload: object): this {
        this.client.refetchQuery(query, payload);

        return this;
    }

    /**
     * @name createFragment
     * @param fragment
     */
    public createFragment(fragment: string): string {
        return this.client.createFragment(fragment);
    }
}