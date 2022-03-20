using Microsoft.AspNetCore.SignalR;

namespace SignalRWebpack.Hubs;

public class ChatHub : Hub
{
  public static class UserHandler
  {
    public static HashSet<string> ConnectedIds = new HashSet<string>();
  }

  public async Task NewMessage(long username, string message, string? connectionId = null, bool isPrivate = false)
  {
    if (connectionId != null && isPrivate)
    {
      var privateMessage = "Your username: " + username + "\nYour connectionId: " + connectionId + "\nYour message: " + message;
      await Clients.Client(connectionId).SendAsync("chatMessageReceived", "SERVER (Private to you)", privateMessage);
    }
    else
    {
      await Clients.All.SendAsync("chatMessageReceived", username, message);
    }
  }

  public async Task ServerMessage(long username)
  {
    var message = "Server says hi to " + username;
    await Clients.All.SendAsync("serverMessageReceived", message);
  }

  public async Task Test(long username)
  {
    var message = username + " triggered a test.";
    await Clients.All.SendAsync("serverMessageReceived", message);
  }

  public override Task OnConnectedAsync()
  {
    UserHandler.ConnectedIds.Add(Context.ConnectionId);
    Clients.All.SendAsync("nrOfUsersReceived", UserHandler.ConnectedIds.Count);
    return base.OnConnectedAsync();
  }

  public override Task OnDisconnectedAsync(Exception? exception)
  {
    UserHandler.ConnectedIds.Remove(Context.ConnectionId);
    Clients.All.SendAsync("nrOfUsersReceived", UserHandler.ConnectedIds.Count);
    return base.OnDisconnectedAsync(exception);
  }
}
