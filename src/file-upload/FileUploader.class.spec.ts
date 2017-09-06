import { Component, NgModule } from '@angular/core';
import { inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploader } from './FileUploader.class';
import { ngfModule } from './ngf.module';

@Component({
  selector: 'container',
  template: `<input type="file" ngfSelect [uploader]="uploader" />`
})
export class ContainerComponent {
  public uploader:FileUploader = new FileUploader({url: 'localhost:3000'});
}

@NgModule({
  imports: [ ngfModule ],
  declarations: [ ContainerComponent ],
  providers: []
  //,bootstrap: [ AppComponent ]
}) export class AppModule {}

describe('FileUploader.class', () => {
  let fixture: ComponentFixture<ContainerComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });

    fixture = TestBed.createComponent(ContainerComponent);
  });

  it('should be fine', ()=>{
    expect(fixture).not.toBeNull();
  })

  it('componentInstance', ()=>{
    expect(fixture.componentInstance.uploader).not.toBeNull();
    expect(fixture.componentInstance.uploader.getFormData.constructor).toEqual( Function );
  })

  it('componentInstance', ()=>{
    expect(fixture.componentInstance.uploader.getFormData().constructor).toEqual( FormData );
  })
});