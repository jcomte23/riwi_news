(() => {
    const isAutorizated=localStorage.getItem("isAutorizated")
    const path= window.location.pathname
    const routeActive=path.substring(path.lastIndexOf("/")+1)
    const privateRoutes=[""]

    if (privateRoutes.includes(routeActive) && isAutorizated !=="true") {
        window.location.href = "/"
    }

    if (isAutorizated !=="true") {
        window.location.href = "/"
    }
})()