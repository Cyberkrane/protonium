
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/products.model';
import { ProductsService } from 'src/app/products.service';



@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  Products!: Products[];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((res) => {
      this.Products = res.map((e) => {
        return { 
              iD: e.payload.doc.id,
              ...(e.payload.doc.data() as Products )
        };
      });
    });
  }

  deleteRow = (product: Products) => this.productsService.deleteProducts(product);

}
