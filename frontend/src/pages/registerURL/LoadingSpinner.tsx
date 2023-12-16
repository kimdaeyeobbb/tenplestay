const LoadingSpinner = () => {
  return (
    <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
      <i className="loader animate-around border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-blue-600 relative inline-block" />
    </div>
  );
};

export default LoadingSpinner;
