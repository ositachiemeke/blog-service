exports.mainHandler = async (event) => {
    // Core logic
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
    };
  };