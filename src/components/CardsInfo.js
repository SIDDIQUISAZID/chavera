const CardInfo = ({ title, children, width, height, imgSrc, description,handleViewDetails   }) => {
    return (
        <div
            className={`bg-white shadow-md rounded-lg p-6 ${width ? width : 'w-fit'} ${height ? height : 'h-fit'}`}
        >
            {imgSrc && (
                <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                />
            )}
            <h1 className="text-cl font-poppins_cf font-medium mb-4">{title}</h1>
            {description && <p className="text-sm text-theme-grey font-normal">{description}</p>}
            <div className="font-poppins_cf text-sm " onClick={handleViewDetails}>View More details</div>
        </div>
    );
};

export default CardInfo;
