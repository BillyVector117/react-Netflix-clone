import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
const SkeletonHome = () => {
    const NumberLists = [1, 2, 3, 4, 5];
    return (
        <>
            {NumberLists.map((number) =>
                <div key={number} className="list">
                    <Skeleton variant="rect" width="40%" />
                    <div className="wrapper">
                        <Skeleton variant="circle" className="sliderArrow left" width={40} height={40} />
                        <div className="container">
                            <Skeleton className="listItem" variant="rect" width={210} height={118} />
                            <Skeleton className="listItem" variant="rect" width={210} height={118} />
                            <Skeleton className="listItem" variant="rect" width={210} height={118} />
                            <Skeleton className="listItem" variant="rect" width={210} height={118} />
                            <Skeleton className="listItem" variant="rect" width={210} height={118} />
                            <Skeleton className="listItem" variant="rect" width={210} height={118} />
                            <Skeleton className="listItem" variant="rect" width={210} height={118} />
                            <Skeleton className="listItem" variant="rect" width={210} height={118} />
                            <Skeleton className="listItem" variant="rect" width={210} height={118} />
                            <Skeleton className="listItem" variant="rect" width={210} height={118} />
                            <Skeleton className="listItem" variant="rect" width={210} height={118} />
                            <Skeleton className="listItem" variant="rect" width={210} height={118} />

                        </div>
                        <Skeleton variant="circle" className="sliderArrow right" width={40} height={40} />
                    </div>
                    <Skeleton variant="rect" className="list" width="90%" />
                </div>
            )}
        </>
    )
}

export default SkeletonHome
