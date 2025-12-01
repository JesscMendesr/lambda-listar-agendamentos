// Nome do arquivo: index.mjs
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    console.log('Consultando TODOS os itens...');
    
    try {
        const params = { TableName: 'agendamentos-esmalteria' };
        const result = await dynamodb.send(new ScanCommand(params));
        
        const itensOrdenados = result.Items.sort((a, b) => 
            new Date(b.timestamp || 0) - new Date(a.timestamp || 0)
        );
        
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                success: true,
                total: itensOrdenados.length,
                data: itensOrdenados
            })
        };
        
    } catch (error) {
        console.error('Erro:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};