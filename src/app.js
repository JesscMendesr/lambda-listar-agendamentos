export const handler = async (event) => {
    try {
        // Parâmetros de paginação da query string
        const limit = event.queryStringParameters?.limit || 50;
        const lastKey = event.queryStringParameters?.lastKey;
        
        const params = {
            TableName: 'agendamentos-esmalteria',
            Limit: parseInt(limit)
        };
        
        // Continua de onde parou (para paginação)
        if (lastKey) {
            params.ExclusiveStartKey = JSON.parse(lastKey);
        }
        
        const result = await dynamodb.send(new ScanCommand(params));
        
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                success: true,
                data: result.Items,
                total: result.Count,
                scanned: result.ScannedCount,
                hasMore: !!result.LastEvaluatedKey,
                lastKey: result.LastEvaluatedKey
            })
        };
        
    } catch (error) {
        console.error('Erro:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};