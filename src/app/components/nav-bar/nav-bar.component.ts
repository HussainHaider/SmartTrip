import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../Models/user.model';
import {Router} from '@angular/router';
import {UserService} from '../../Services/User/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  modalReference: NgbModalRef;
  closeResult: string;
  isExpanded: boolean;
  imageUrl = '/assets/images/Hotal.png';
  constructor(private modalService: NgbModal, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }
  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  submit(f) {
    console.log(f.value);
    console.log('hello1');
    const user = new User(
      f.value.email, f.value.password
    );
    console.log('hello2');
    this.userService.signin(user)
      .subscribe(
        data => {
          console.log('DATA is here:', JSON.stringify(data));
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          this.modalReference.close();
          this.router.navigateByUrl('/hotel');
        },
        error => console.error(error)
      );
    console.log('hello4');
  }
  isLoggedIn() {
    return this.userService.isLoggedIn();
  }
  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/hotel');
  }

}
