const aiplatform = require('@google-cloud/aiplatform');

exports.helloWorld = async (req, res) => {
    const text = req.query.name
    const prediction = await getPrediction(text);
    return res.json({ status: 'success', msg: prediction })
};

//Code reference: [3]"@google-cloud/aiplatform", npm, 2021. [Online]. Available: https://www.npmjs.com/package/@google-cloud/aiplatform. [Accessed: 02- Aug- 2021].
const getPrediction = async (text) => {
    const {instance, prediction} =
        aiplatform.protos.google.cloud.aiplatform.v1.schema.predict;

    const {PredictionServiceClient} = aiplatform.v1;

    const predictionServiceClient = new PredictionServiceClient({
        apiEndpoint: 'us-central1-aiplatform.googleapis.com',
    });

    const endpoint = `projects/serverless-316507/locations/us-central1/endpoints/1960666726836207616`;

    const predictionInstance =
        new instance.TextClassificationPredictionInstance({
            content: text,
        });

    const instanceValue = predictionInstance.toValue();

    const instances = [instanceValue];
    const request = {
        endpoint,
        instances,
    };

    const [response] = await predictionServiceClient.predict(request);

    const predictions = [];

    for (const predictionResultValue of response.predictions) {
        const predictionResult =
            prediction.ClassificationPredictionResult.fromValue(
                predictionResultValue
            );

        for (const [i, label] of predictionResult.displayNames.entries()) {
            let item = {"label": label, "confidence": predictionResult.confidences[i]};
            predictions.push(item)
        }
    }

    let maxConfidence = Math.max(...predictions.map(e => e.confidence));
    return predictions.find(prediction => prediction.confidence === maxConfidence);
};



