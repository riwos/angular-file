import { Component, NgModule } from '@angular/core';
import { inject, ComponentFixture, TestBed, async } from '@angular/core/testing';
//import { By } from '@angular/platform-browser';
import { ngfModule } from './ngf.module';
import { ngfUploader } from './ngfUploader.directive';

@Component({
  selector: 'container',
  template: '<ngfUploader [(ref)]="uploader"></ngfUploader>'
})
export class ContainerComponent {
  uploader:ngfUploader
}

@NgModule({
  imports: [ ngfModule ],
  declarations: [ ContainerComponent ]
}) export class AppModule {}

describe('ngfUploader', () => {
  let fixture: ComponentFixture<ContainerComponent>;
  let component
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });

    TestBed.compileComponents()
    .then(()=>{
      fixture = TestBed.createComponent(ContainerComponent);
      fixture.detectChanges();
      component = fixture.componentInstance
    })
  }));

  it('inits', ()=>{
    expect(fixture).not.toBeNull();
    expect(component).not.toBeNull();
  })

  it('uploader', ()=>{
    expect(component.uploader).not.toBeNull();
  })
});