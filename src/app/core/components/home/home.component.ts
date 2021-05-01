import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Post} from "../../models/post";
import {PostService} from "../../services/post.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Place} from "../../models/place";
import {PlaceService} from "../../services/place.service";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "ngx-store";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  providers: [PostService, PlaceService],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit{

  posts: Post[]  = [];
  closeResult = '';
  modalRef: NgbModalRef;
  updatablePost: Post = new Post();
  places: Place[] = [];
  currentUserId: string;

  constructor(private service: PostService, private modalService: NgbModal,
              private placeService: PlaceService, private toastr: ToastrService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.currentUserId = this.localStorage.get('user_id');
    this.getPlaces();
    this.getPosts();
  }

  getPosts() {
    this.service.getPosts().subscribe(
      posts => this.posts = posts,
      error => console.log(error)
    );
  }

  getPlaces() {
    this.placeService.getPlaces().subscribe(
      places => this.places = places,
      error => console.log(error)
    )
  }

  onPostCreate(isCreated: boolean) {
    if(isCreated){
      this.getPosts();
    }
  }

  loadUpdateModal(content: any, postId: string) {
    this.updatablePost = this.posts.find(p => p.id === postId);
    this.updatablePost.isPublic = this.updatablePost.visibility === 'public';
    this.openModal(content);
  }

  openModal(content: any) {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed `;
    });
  }

  update() {
    this.service.updatePost(this.updatablePost).subscribe(
      post => {
        //TODO show toast message and handle response by respone status
        if(post.id) {
          this.toastr.success('Post updated successfully', 'Post');
          this.modalRef.dismiss();
        } else {
          this.toastr.error('Post update failed', 'Post')
        }
        this.getPosts();
      },
      error => this.toastr.error('Post update failed', 'Post')

    )
  }
}
