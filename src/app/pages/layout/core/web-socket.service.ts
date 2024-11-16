import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {EventHandlerService} from './event-handler.service';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;
  isSocketConnected$: Subject<boolean> = new Subject();
  isSocketConnected =  false;
  isSocketStarted$: Subject<boolean> = new Subject();
  isSocketStarted= false;

  constructor(private eventHandlerService: EventHandlerService) {
  }

  disconnectSocket(): void {
    this.socket.close();
  }

  connectSocket(): void {
    this.socket = new WebSocket('ws://127.0.0.1:8887');

    this.socket.onopen = () => {
       this.isSocketConnected$.next(true);
       this.isSocketConnected = true;
    };

    this.socket.onmessage = (event: any) => {
      if (event.data === 'Started') {
        this.isSocketStarted$.next(true);
        this.isSocketStarted = true;
      } else {
        try {
          this.eventHandlerService.newEvent(JSON.parse(event.data));
        } catch (e) {

        }

      }
    };

    this.socket.onclose = (event) => {
      this.isSocketConnected$.next(false);
      this.isSocketConnected = false;
      this.isSocketStarted$.next(false);
      this.isSocketStarted = false
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

  }


  startSocket(data: string): void {
    this.socket.send(data);
  }
}
