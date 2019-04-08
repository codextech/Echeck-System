
exports.JsonResponse = (res,status, message, result) => {

    res.json(
        {status: status,
             message: message,
              data: result });

}