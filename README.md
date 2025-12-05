# lambda-listar-agendamentos

Esta função AWS Lambda lista todos os agendamentos salvos na tabela DynamoDB `agendamentos-esmalteria`.

## Visão geral
- **Runtime:** Node.js 20+ (ES Modules)
- **Arquivo principal:** `index.mjs`
- **Banco:** DynamoDB (tabela hard-coded)
- **Operação:** Scan (busca todos os itens)
- **Ordenação:** Mais recentes primeiro (por campo `timestamp`)

## Como funciona
1. Recebe um evento HTTP (API Gateway ou chamada direta).
2. Executa um `ScanCommand` na tabela DynamoDB `agendamentos-esmalteria`.
3. Ordena os resultados pelo campo `timestamp` (decrescente).
4. Retorna JSON com todos os agendamentos, total e status.

## Exemplo de resposta
```json
{
	"success": true,
	"total": 2,
	"data": [
		{
			"id": 1700000000000,
			"telefone": "+5511999999999",
			"nome_cliente": "Maria Silva",
			"data": "25/03/2024",
			"horario": "14:00",
			"servico": "Manicure completa",
			"status": "pendente_confirmacao",
			"timestamp": "2024-03-25T17:00:00.000Z",
			"timestamp_brasil": "25/03/2024 14:00:00"
		}
	]
}
```

## Teste local
Crie um arquivo `test-run.mjs`:
```js
import { handler } from './index.mjs';
handler({}).then(res => console.log(res.body));
```
Execute com:
```sh
node test-run.mjs
```

## Observações
- A tabela DynamoDB está hard-coded. Para produção, use variável de ambiente.
- A função espera permissões de leitura na tabela.
- O código não faz paginação (retorna todos os itens de uma vez).

## Melhorias sugeridas
- Tornar o nome da tabela configurável por env var.
- Adicionar paginação para grandes volumes.
- Adicionar filtros por data/status.

---
README gerado automaticamente para facilitar uso e manutenção.