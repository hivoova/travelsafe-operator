import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
@Injectable()
export class RouteAction {
    static SET_ROOT_ROUTE = 'SET_ROOT_ROUTE';
    setRootRoute(route: string) : Action{
        return {
            type: RouteAction.SET_ROOT_ROUTE,
            payload: route
        }
    }

    static PUSH_ROUTE = 'PUSH_ROUTE';
    pushRoute(route: string) : Action{
        return {
            type: RouteAction.PUSH_ROUTE,
            payload: route
        }
    }

    static POP_ROUTE = 'POP_ROUTE';
    popRoute() : Action {
        return {
            type: RouteAction.POP_ROUTE
        }
    }

    static REPLACE_ROUTE = 'REPLACE_ROUTE';
    replaceRoute(route:string , replaceRoute: string) : Action {
        return {
            type: RouteAction.REPLACE_ROUTE,
            payload: {
                route,
                replaceRoute
            }
        }
    }
}