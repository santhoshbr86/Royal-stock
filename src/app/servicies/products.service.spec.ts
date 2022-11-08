import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductsService } from './products.service';

fdescribe('ProductsService', () => {
  let service: ProductsService;
  let httpTestController: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations:[],
      providers:[ProductsService]
    });
    service = TestBed.inject(ProductsService);
    httpTestController = TestBed.inject(HttpTestingController);

  });

  it('should service be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', fakeAsync(() => {
    let res=null;
    service.getProducts().subscribe((data:any) => {
      res = data;
      expect(data.length).toEqual(2);
    })
    tick()
    const req = httpTestController.expectOne({
      method:'GET',
      url:'http://localhost:4000/api/products'
    });
    req.flush([{name:'p1'},{name:'p1'}])
  }));
});
