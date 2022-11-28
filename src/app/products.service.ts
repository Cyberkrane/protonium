import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Products } from "src/app/products.model";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private angularFirestore: AngularFirestore
  ) { }

  // metodos CRUD

  getProducts() {
    return this.angularFirestore
      .collection("productos")
      .snapshotChanges();
  }

  getProductsById(id: string) {
    return this.angularFirestore
      .collection("productos")
      .doc(id)
      .valueChanges();
  }

  createProducts(products: Products) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection("productos")
        .add(products)
        .then((response) => {
          console.log(response)
        }),
        (error: any) => {
          reject(error)
        }
    })
  }

  updateProducts(products: Products, id: string) {
    this.angularFirestore
      .collection("productos")
      .doc(id)
      .update({
        cantidad: products.cantidad,
        existencia: products.existencia,
        nombre: products.nombre,
        precio: products.precio
      })
  }

  deleteProducts(products: Products) {
    this.angularFirestore
      .collection("productos")
      .doc(products.id)
      .delete()
  }

}
