using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace QuestionHelper.Hubs {
    public class QuestionsHub : Hub {
        public override async Task OnConnectedAsync () {
            await base.OnConnectedAsync ();
            await Clients.Caller.SendAsync ("Message", "Connection successful");
        }

        public override async Task OnDisconnectedAsync (Exception exception) {
            await Clients.Caller.SendAsync ("Message", "Disconnection successful");
            await base.OnDisconnectedAsync (exception);
        }

        public async Task SubscribeQuestion (int questionId) {
            await Groups.AddToGroupAsync (Context.ConnectionId, $"Question-{questionId}");
            await Clients.Caller.SendAsync ("Message", "Subscription successful");
        }

        public async Task UnsubscribeQuestion (int questionId) {
            await Groups.RemoveFromGroupAsync (Context.ConnectionId, $"Question-{questionId}");
            await Clients.Caller.SendAsync ("Message", "Unsubscription successful");
        }
    }
}