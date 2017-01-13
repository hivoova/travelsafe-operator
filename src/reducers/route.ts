/*Not complete yet */

import { RouteAction } from '../actions/route';
import { RouteDetail } from '../models/route';

export interface RouteState {
    routeDetail: RouteDetail
}

const initState : RouteState = {
    routeDetail: {
        currentRoute: "",
        previousRoute: "",
        pushRoute: []
    }
}

function setCurrentRoute(state , action ) {
    return Object.assign({} , state , { currentRoute: action.payload})
}

function replaceRoute(state , prevRoute , action) {
    return Object.assign({} , state , {
        previousRoute: prevRoute ,
        currentRoute: action.payload
    })
}

function pushRoute(state , action) {
    return Object.assign({} , state , {
        pushRoute: state.pushRoute.concat(action.payload)
    })
}

function popRoute(state){
    return Object.assign({} , state , {
        pushRoute: state.pushRoute.pop()
    })
}

export function RouteReducer (state = initState , action) {
    switch(action.type) {
        case RouteAction.SET_ROOT_ROUTE :
            return Object.assign({} , state , { routeDetail : setCurrentRoute(state.routeDetail , action)})
        case RouteAction.REPLACE_ROUTE : 
            let previousRoute = state.routeDetail.currentRoute
            return Object.assign({},state ,{routeDetail: replaceRoute(state.routeDetail , previousRoute , action)})
        case RouteAction.PUSH_ROUTE : 
            return Object.assign({} , state , {routeDetail: pushRoute(state.routeDetail , action)})
        case RouteAction.POP_ROUTE :
            return Object.assign({} , state , {routeDetail : popRoute(state.routeDetail)})
        default :
            return state
    }
}