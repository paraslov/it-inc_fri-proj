import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {TAppState} from "../../n2-bll/store";
import {PATH} from "../../n1-app/a2-routes/Routes";

type MapStatePropsType = {
    completed: boolean
    error: string
}


const mapStateToProps = (state: TAppState): MapStatePropsType => {
    return {completed: state.registration.completed,
    error: state.registration.error}
}

export function WithAuthRedirect<T>( Component: React.ComponentType<T> )  {

    const RedirectComponent: React.FC<MapStatePropsType> = (props) => {

        let {error ,completed, ...restProps} = props
        if (completed  && error === undefined) return <Redirect to={PATH.LOGIN} />

        return <Component {...restProps as unknown as T} />
    }

    return connect<MapStatePropsType, {}, T, TAppState>(mapStateToProps)(RedirectComponent)
}