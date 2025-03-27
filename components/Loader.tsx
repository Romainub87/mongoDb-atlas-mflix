const Loader = () => {
    return (
        <div className="flex absolute items-center justify-center h-screen w-screen">
            <div className="loader JS_on">
                <span className="binary"></span>
                <span className="binary"></span>
                <span className="getting-there">Chargement...</span>
            </div>
        </div>
    );
};

export default Loader;