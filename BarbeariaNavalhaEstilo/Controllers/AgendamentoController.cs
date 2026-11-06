using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace BarbeariaNavalhaEstilo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgendamentoController : ControllerBase
    {
        private const string RemetenteEmail = "guilhermesilvacredito@gmail.com";

        [HttpPost("cancelar")]
        public async Task<IActionResult> CancelarAgendamento([FromBody] CancelamentoRequest request)
        {
            TimeSpan antecedencia = request.DataHoraAgendamento - DateTime.Now;

            if (antecedencia.TotalHours >= 2)
            {
                // Regra: Cancelamento com mais de 2 horas -> Devolução integral
                await EnviarEmailAsync(request.EmailCliente, "Confirmação de Cancelamento e Estorno",
                    $"Seu cancelamento foi realizado. O estorno do valor de R$ {request.ValorPago:F2} foi efetuado.");

                await EnviarWhatsAppAsync(request.TelefoneCliente,
                    "Seu agendamento foi cancelado e o estorno liberado.");

                return Ok(new { mensagem = "Estorno efetuado com sucesso." });
            }
            else
            {
                // Regra: Menos de 2 horas -> Retenção da taxa/sinal
                await EnviarWhatsAppAsync(request.TelefoneCliente,
                    "Cancelamento fora do prazo limite (2h). A taxa de entrada de R$ 50,00 foi retida.");

                return BadRequest(new { mensagem = "Cancelamento fora do prazo mínimo de 2h. Valor não reembolsável." });
            }
        }

        private async Task EnviarEmailAsync(string destino, string assunto, string mensagem)
        {
            // Lógica reservada para envio via SMTP/SendGrid
            await Task.CompletedTask;
        }

        private async Task EnviarWhatsAppAsync(string telefone, string mensagem)
        {
            // Lógica reservada para integração de WhatsApp
            await Task.CompletedTask;
        }
    }

    public class CancelamentoRequest
    {
        public string EmailCliente { get; set; }
        public string TelefoneCliente { get; set; }
        public DateTime DataHoraAgendamento { get; set; }
        public decimal ValorPago { get; set; }
    }
}