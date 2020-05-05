import React from "react"
import "Preloader.css"

export default () => (
    <div className="preloader-wrapper big active preloader-is-active">
        <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
                <div className="circle"/>
            </div>
            <div className="gap-patch">
                <div className="circle"/>
            </div>
            <div className="circle-clipper right">
                <div className="circle"/>
            </div>
        </div>
    </div>
)




