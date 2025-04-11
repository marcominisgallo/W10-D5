const MyFooter = () => {
  return (
    <div className="py-3 text-center">
      <p className="mb-1 text-light">EpiMeteo - {new Date().getFullYear()}</p>
    </div>
  );
};

export default MyFooter;
