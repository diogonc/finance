import {Component, OnInit} from '@angular/core';
import {UserRepository} from './services/repository/user-repository';
import {LoginEvent} from './events/login-event';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  isLogged: boolean;
  title: 'Financeiro';
  private userRepository: UserRepository;

  constructor(repository: UserRepository, loginEvent: LoginEvent) {
    this.userRepository = repository;

    loginEvent.logginAnnouced$.subscribe(
      user => {
        this.isLogged = this.userRepository.isLogged();
      });
  }

  ngOnInit() {
    this.isLogged = this.userRepository.isLogged();
  }
}
