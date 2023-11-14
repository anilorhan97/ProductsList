import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProductList } from 'src/app/models/Productlist';
import { ProductsService } from 'src/app/services/products.service';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  displayedColumns: string[] = ['id','brand','title','category','discountPercentage','price','rating','stock','thumbnail','description','images','edit'];
  dataSource:MatTableDataSource<ProductList[]> = new MatTableDataSource<ProductList[]>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable)
  table!: MatTable<any>;
  productList : ProductList[] = [];

  constructor(
    private productService : ProductsService
  ){}

  ngOnInit(): void {
    this.getAllProduct();
  }

  drag(event : CdkDragDrop<ProductList>){
    moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
    this.table.renderRows();
    this.dataSource.paginator = this.paginator; 
  }

  getAllProduct(){
    this.productService.getAllProducts().subscribe((productList : ProductList[]) => {
      this.productList = productList;
      this.dataSource = new MatTableDataSource<ProductList[]>(Object(this.productList).products);
      this.dataSource.paginator = this.paginator;
    })
  }

}
