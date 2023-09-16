(()=>{"use strict";class t{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.data=t,this.isClass=e,this.element=this.createElement()}createElement(){const t=document.createElement("div");t.setAttribute("data-pin",this.data.pin),t.setAttribute("id",this.data.id),t.classList.add("task-item");let e="checkbox_input";return this.isClass&&(e="checkbox_input checkbox_input_checked"),t.innerHTML=`\n      <label class="checkbox">\n        <input type="text" class="${e}">\n        <div class="checkbox__text" data-text=${this.data.text}>${this.data.text}</div>\n      </label>\n    `,t}}class e{constructor(t,e,s){this.pin=t,this.text=e,this.id=s}}class s{constructor(t){this.elemModal=null,this.eventShowModal=null,this.eventHideModal=null,this.hiding=!1,this.destroyed=!1,this.animationSpeed=200,this.options=t||{},this.createModal(),this.elemModal.addEventListener("click",this.handlerCloseModal.bind(this)),this.eventShowModal=new CustomEvent("show.modalFunc",{detail:this.elemModal}),this.eventHideModal=new CustomEvent("hide.modalFunc",{detail:this.elemModal})}createModal(){this.elemModal=document.createElement("div");let t,e="";if(this.elemModal.classList.add("modalFunc"),t='<div class="modal__backdrop" data-dismiss="modalFunc"><div class="modal__content"><div class="modal__header"><div class="modal__title" data-modalFunc="title">{{title}}</div><span class="modal__btn-close" data-dismiss="modalFunc" title="Закрыть">×</span></div><div class="modal__body" data-modalFunc="content">{{content}}</div>{{footer}}</div></div>'.replace("{{title}}",this.options.title||"Новое окно"),t=t.replace("{{content}}",this.options.content||""),this.options.footerButtons){for(const t of this.options.footerButtons){let s='<button type="button" class="{{button_class}}" data-handler={{button_handler}}>{{button_text}}</button>'.replace("{{button_class}}",t.class);s=s.replace("{{button_handler}}",t.handler),s=s.replace("{{button_text}}",t.text),e+=s}e='<div class="modal__footer">{{buttons}}</div>'.replace("{{buttons}}",e)}t=t.replace("{{footer}}",e),this.elemModal.innerHTML=t,document.body.appendChild(this.elemModal)}show(){this.destroyed||this.hiding||(this.elemModal.classList.add("modal__show"),document.dispatchEvent(this.eventShowModal))}hide(){this.hiding=!0,this.elemModal.classList.remove("modal__show"),this.elemModal.classList.add("modal__hiding"),setTimeout((()=>{this.elemModal.classList.remove("modal__hiding"),this.hiding=!1}),this.animationSpeed),document.dispatchEvent(this.eventHideModal)}handlerCloseModal(t){("modalFunc"===t.target.dataset.dismiss||t.target.dataset.handler)&&this.hide()}destroy(){this.elemModal.parentElement&&this.elemModal.parentElement.removeChild(this.elemModal),this.elemModal.removeEventListener("click",this.handlerCloseModal.bind(this))}setContent(t){this.elemModal.querySelector('[data-modalFunc="content"]').innerHTML=t}setTitle(t){this.elemModal.querySelector('[data-modalFunc="title"]').innerHTML=t}}function i(t){for(;t.children.length>2;)t.lastChild.remove()}console.log("it works!");(new class{constructor(){this.container=null,this.tasks=[],this.pinnedTasksEl=[],this.allTasksEl=[],this.isModal=!1,this.initModalListener()}bindToDOM(t){if(!(t instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=t,this.drawUi()}checkBinding(){if(null===this.container)throw new Error("Tracker not bind to DOM")}drawUi(){this.checkBinding(),this.render(),this.pinnedTasksEl=this.container.querySelector(".tasks-pinned"),this.allTasksEl=this.container.querySelector(".tasks-all"),this.pinnedNoTaskEl=this.pinnedTasksEl.querySelector(".no-tasks"),this.noAllTasksEl=this.allTasksEl.querySelector(".no-tasks"),this.events()}render(){this.container.insertAdjacentHTML("beforeend",'\n      <div class="tasks-wrapper">\n        <div class="tasks-board">\n          <div class="task-form">\n            <form>\n              <label class="task-title task-title_label" for="enter-text">TOP Tasks</label>\n              <input class="task-form__input" data-id="enter-text" type="text" name="enter-text" placeholder="Enter your text here">\n            </form>\n        </div>\n        <div class="tasks-pinned">\n          <div class="tasks-title">Pinned:</div>\n          <div class="no-tasks">No pinned tasks</div>\n        </div>\n        <div class="tasks-all">\n          <div class="tasks-title">All Tasks:</div>\n          <div class="no-tasks">No tasks found</div>\n        </div>\n      </div>\n    </div>\n    ')}events(){const t=document.querySelector("[data-id='enter-text']");this.container.querySelector("form").addEventListener("submit",(t=>this.onSubmit(t))),this.container.addEventListener("click",(t=>this.onClick(t))),t.addEventListener("input",(()=>this.onInput(t)))}initModalListener(){document.addEventListener("click",(t=>{"modalHandlerCancel"===t.target.dataset.handler&&this.currentModal&&(this.currentModal.hide(),this.isModal=!1)}))}createTask(t){const s=new e("no",t,Date.now());return this.tasks.push(s),s}onClick(t){if("text"===t.target.type){if(t.target.closest(".tasks-all"))return void this.redraw(t,"yes",this.pinnedTasksEl,this.pinnedNoTaskEl,!0);t.target.closest(".tasks-pinned")&&this.redraw(t,"no",this.allTasksEl)}}onSubmit(t){t.preventDefault();const{value:e}=t.currentTarget.querySelector("[data-id='enter-text']");e?(this.createTask(e),this.noAllTasksEl.classList.add("inactive"),this.showAllTasks("no"),t.currentTarget.querySelector("[data-id='enter-text']").value=""):this.showModalMessage("Write text!","✍")}onInput(e){i(this.allTasksEl);const s=(a=this.sort(),n=e.value,a.filter((t=>function(t,e){const s=e.trim().toLowerCase();return t.toLowerCase().includes(s)}(t.text,n))));var a,n;0===s.length?this.noAllTasksEl.classList.remove("inactive"):this.noAllTasksEl.classList.add("inactive"),s.forEach((e=>{const s=new t(e);this.allTasksEl.appendChild(s.element)}))}showAllTasks(e){const s={no:{array:this.allTasksEl,activeEl:this.pinnedNoTaskEl,inactiveEl:this.noAllTasksEl,isClass:!1},yes:{array:this.pinnedTasksEl,activeEl:this.noAllTasksEl,inactiveEl:this.pinnedNoTaskEl,isClass:!0}},{array:i,activeEl:a,inactiveEl:n,isClass:l}=s[e],o=this.sort(e);0!==o.length&&n.classList.add("inactive"),o.length===this.tasks.length&&a.classList.remove("inactive"),o.forEach((e=>{const s=new t(e,l);i.appendChild(s.element)}))}redraw(t,e,s){const a=t.target.closest(".task-item"),n=this.tasks.find((t=>t.id===+a.id));n&&(n.pin=e),a.remove(),i(s),this.showAllTasks(e)}sort(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"no";return this.tasks.filter((e=>e.pin===t))}showModalMessage(t,e){this.isModal||(this.isModal=!0,this.showModal(t,e))}showModal(t,e){this.currentModal=new s({title:t,content:e,footerButtons:[{class:"btn btn__cancel",text:"Close",handler:"modalHandlerCancel"}]}),this.currentModal.show()}}).bindToDOM(document.querySelector(".tasks-container"))})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFVbUMsT0FBTyxZQUc1QnVFLEVBQWlCUixTQUFTUyxJQUN4QixNQUFNUixFQUFXLElBQUlsSCxFQUFTMEgsRUFBVXZILEdBQ3hDa0gsRUFBTXZFLFlBQVlvRSxFQUFTMUcsUUFBUSxHQUV2QyxDQUVBMkYsT0FBTy9DLEVBQUd2QyxFQUFLd0csR0FDYixNQUFNTSxFQUFldkUsRUFBRUMsT0FBTzZDLFFBQVEsY0FFaEMwQixFQUFlckgsS0FBS2dFLE1BQU1zRCxNQUM3QmhDLEdBQVNBLEVBQUsvRSxNQUFRNkcsRUFBYTdHLEtBRWxDOEcsSUFDRkEsRUFBYS9HLElBQU1BLEdBR3JCOEcsRUFBYXpFLFNBRWJjLEVBQVdxRCxHQUNYOUcsS0FBSytGLGFBQWF6RixFQUNwQixDQUVBNEYsT0FBaUIsSUFBWjVGLEVBQUdULFVBQUFDLE9BQUEsUUFBQUMsSUFBQUYsVUFBQSxHQUFBQSxVQUFBLEdBQUcsS0FDVCxPQUFPRyxLQUFLZ0UsTUFBTW9DLFFBQVFkLEdBQVNBLEVBQUtoRixNQUFRQSxHQUNsRCxDQUVBMEYsaUJBQWlCdUIsRUFBU0MsR0FDcEJ4SCxLQUFLbUUsVUFDVG5FLEtBQUttRSxTQUFVLEVBQ2ZuRSxLQUFLeUgsVUFBVUYsRUFBU0MsR0FDMUIsQ0FFQUMsVUFBVUYsRUFBU0MsR0FDakJ4SCxLQUFLbUYsYUFBZSxJQUFJckUsRUFBTSxDQUM1QmlCLE1BQU93RixFQUNQdkYsUUFBU3dGLEVBQ1R2RixjQUFlLENBQ2IsQ0FDRUcsTUFBTyxrQkFDUHhCLEtBQU0sUUFDTnlCLFFBQVMseUJBSWZyQyxLQUFLbUYsYUFBYTNDLE1BQ3BCLElEbE1XNkIsVUFBVWpFLFNBQVNtRCxjQUFjLG9CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vVE9QX3Rhc2tzLy4vc3JjL2pzL2NvbXBvbmVudHMvdGFzay1pdGVtL1Rhc2tJdGVtLmpzIiwid2VicGFjazovL1RPUF90YXNrcy8uL3NyYy9qcy9jb21wb25lbnRzL3Rhc2svVGFzay5qcyIsIndlYnBhY2s6Ly9UT1BfdGFza3MvLi9zcmMvanMvY29tcG9uZW50cy9tb2RhbC9Nb2RhbC5qcyIsIndlYnBhY2s6Ly9UT1BfdGFza3MvLi9zcmMvanMvdXRpbHMvcmVzZXRBcnJheS5qcyIsIndlYnBhY2s6Ly9UT1BfdGFza3MvLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovL1RPUF90YXNrcy8uL3NyYy9qcy9jb21wb25lbnRzL3Rhc2tzLXRyYWNrZXIvVGFza3NUcmFja2VyLmpzIiwid2VicGFjazovL1RPUF90YXNrcy8uL3NyYy9qcy9jb21wb25lbnRzL3Rhc2tzLXRyYWNrZXIvZ2VuZXJhdGUtdGFza3MtdHJhY2tlci1tYXJrdXAuanMiLCJ3ZWJwYWNrOi8vVE9QX3Rhc2tzLy4vc3JjL2pzL3V0aWxzL2ZpbHRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vdGFzay1pdGVtLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tJdGVtIHtcbiAgY29uc3RydWN0b3IoZGF0YSwgaXNDbGFzcyA9IGZhbHNlKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLmlzQ2xhc3MgPSBpc0NsYXNzO1xuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudCgpO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudCgpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1waW4nLCB0aGlzLmRhdGEucGluKTtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5kYXRhLmlkKTtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKCd0YXNrLWl0ZW0nKTtcblxuICAgIGxldCBjbGFzc0lucHV0ID0gJ2NoZWNrYm94X2lucHV0JztcbiAgICBpZiAodGhpcy5pc0NsYXNzKSB7XG4gICAgICBjbGFzc0lucHV0ID0gJ2NoZWNrYm94X2lucHV0IGNoZWNrYm94X2lucHV0X2NoZWNrZWQnO1xuICAgIH1cblxuICAgIGVsLmlubmVySFRNTCA9IGBcbiAgICAgIDxsYWJlbCBjbGFzcz1cImNoZWNrYm94XCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiJHtjbGFzc0lucHV0fVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2hlY2tib3hfX3RleHRcIiBkYXRhLXRleHQ9JHt0aGlzLmRhdGEudGV4dH0+JHt0aGlzLmRhdGEudGV4dH08L2Rpdj5cbiAgICAgIDwvbGFiZWw+XG4gICAgYDtcblxuICAgIHJldHVybiBlbDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKHBpbiwgdGV4dCwgaWQpIHtcbiAgICB0aGlzLnBpbiA9IHBpbjtcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgfVxufVxuIiwiaW1wb3J0ICcuL21vZGFsLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGFsIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuZWxlbU1vZGFsID0gbnVsbDtcbiAgICB0aGlzLmV2ZW50U2hvd01vZGFsID0gbnVsbDtcbiAgICB0aGlzLmV2ZW50SGlkZU1vZGFsID0gbnVsbDtcbiAgICB0aGlzLmhpZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuZGVzdHJveWVkID0gZmFsc2U7XG4gICAgdGhpcy5hbmltYXRpb25TcGVlZCA9IDIwMDtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB0aGlzLmNyZWF0ZU1vZGFsKCk7XG4gICAgdGhpcy5lbGVtTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJDbG9zZU1vZGFsLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5ldmVudFNob3dNb2RhbCA9IG5ldyBDdXN0b21FdmVudCgnc2hvdy5tb2RhbEZ1bmMnLCB7XG4gICAgICBkZXRhaWw6IHRoaXMuZWxlbU1vZGFsLFxuICAgIH0pO1xuICAgIHRoaXMuZXZlbnRIaWRlTW9kYWwgPSBuZXcgQ3VzdG9tRXZlbnQoJ2hpZGUubW9kYWxGdW5jJywge1xuICAgICAgZGV0YWlsOiB0aGlzLmVsZW1Nb2RhbCxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZU1vZGFsKCkge1xuICAgIHRoaXMuZWxlbU1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgbW9kYWxUZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwibW9kYWxfX2JhY2tkcm9wXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxGdW5jXCI+PGRpdiBjbGFzcz1cIm1vZGFsX19jb250ZW50XCI+PGRpdiBjbGFzcz1cIm1vZGFsX19oZWFkZXJcIj48ZGl2IGNsYXNzPVwibW9kYWxfX3RpdGxlXCIgZGF0YS1tb2RhbEZ1bmM9XCJ0aXRsZVwiPnt7dGl0bGV9fTwvZGl2PjxzcGFuIGNsYXNzPVwibW9kYWxfX2J0bi1jbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsRnVuY1wiIHRpdGxlPVwi0JfQsNC60YDRi9GC0YxcIj7Dlzwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwibW9kYWxfX2JvZHlcIiBkYXRhLW1vZGFsRnVuYz1cImNvbnRlbnRcIj57e2NvbnRlbnR9fTwvZGl2Pnt7Zm9vdGVyfX08L2Rpdj48L2Rpdj4nO1xuICAgIGNvbnN0IG1vZGFsRm9vdGVyVGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cIm1vZGFsX19mb290ZXJcIj57e2J1dHRvbnN9fTwvZGl2Pic7XG4gICAgY29uc3QgbW9kYWxCdXR0b25UZW1wbGF0ZSA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInt7YnV0dG9uX2NsYXNzfX1cIiBkYXRhLWhhbmRsZXI9e3tidXR0b25faGFuZGxlcn19Pnt7YnV0dG9uX3RleHR9fTwvYnV0dG9uPic7XG4gICAgbGV0IG1vZGFsSFRNTDtcbiAgICBsZXQgbW9kYWxGb290ZXJIVE1MID0gJyc7XG5cbiAgICB0aGlzLmVsZW1Nb2RhbC5jbGFzc0xpc3QuYWRkKCdtb2RhbEZ1bmMnKTtcbiAgICBtb2RhbEhUTUwgPSBtb2RhbFRlbXBsYXRlLnJlcGxhY2UoXG4gICAgICAne3t0aXRsZX19JyxcbiAgICAgIHRoaXMub3B0aW9ucy50aXRsZSB8fCAn0J3QvtCy0L7QtSDQvtC60L3QvicsXG4gICAgKTtcbiAgICBtb2RhbEhUTUwgPSBtb2RhbEhUTUwucmVwbGFjZSgne3tjb250ZW50fX0nLCB0aGlzLm9wdGlvbnMuY29udGVudCB8fCAnJyk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5mb290ZXJCdXR0b25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiB0aGlzLm9wdGlvbnMuZm9vdGVyQnV0dG9ucykge1xuICAgICAgICBsZXQgbW9kYWxGb290ZXJCdXR0b24gPSBtb2RhbEJ1dHRvblRlbXBsYXRlLnJlcGxhY2UoXG4gICAgICAgICAgJ3t7YnV0dG9uX2NsYXNzfX0nLFxuICAgICAgICAgIGJ1dHRvbi5jbGFzcyxcbiAgICAgICAgKTtcbiAgICAgICAgbW9kYWxGb290ZXJCdXR0b24gPSBtb2RhbEZvb3RlckJ1dHRvbi5yZXBsYWNlKFxuICAgICAgICAgICd7e2J1dHRvbl9oYW5kbGVyfX0nLFxuICAgICAgICAgIGJ1dHRvbi5oYW5kbGVyLFxuICAgICAgICApO1xuICAgICAgICBtb2RhbEZvb3RlckJ1dHRvbiA9IG1vZGFsRm9vdGVyQnV0dG9uLnJlcGxhY2UoXG4gICAgICAgICAgJ3t7YnV0dG9uX3RleHR9fScsXG4gICAgICAgICAgYnV0dG9uLnRleHQsXG4gICAgICAgICk7XG4gICAgICAgIG1vZGFsRm9vdGVySFRNTCArPSBtb2RhbEZvb3RlckJ1dHRvbjtcbiAgICAgIH1cbiAgICAgIG1vZGFsRm9vdGVySFRNTCA9IG1vZGFsRm9vdGVyVGVtcGxhdGUucmVwbGFjZShcbiAgICAgICAgJ3t7YnV0dG9uc319JyxcbiAgICAgICAgbW9kYWxGb290ZXJIVE1MLFxuICAgICAgKTtcbiAgICB9XG4gICAgbW9kYWxIVE1MID0gbW9kYWxIVE1MLnJlcGxhY2UoJ3t7Zm9vdGVyfX0nLCBtb2RhbEZvb3RlckhUTUwpO1xuICAgIHRoaXMuZWxlbU1vZGFsLmlubmVySFRNTCA9IG1vZGFsSFRNTDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWxlbU1vZGFsKTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgaWYgKCF0aGlzLmRlc3Ryb3llZCAmJiAhdGhpcy5oaWRpbmcpIHtcbiAgICAgIHRoaXMuZWxlbU1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsX19zaG93Jyk7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRoaXMuZXZlbnRTaG93TW9kYWwpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5oaWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuZWxlbU1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsX19zaG93Jyk7XG4gICAgdGhpcy5lbGVtTW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWxfX2hpZGluZycpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5lbGVtTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWxfX2hpZGluZycpO1xuICAgICAgdGhpcy5oaWRpbmcgPSBmYWxzZTtcbiAgICB9LCB0aGlzLmFuaW1hdGlvblNwZWVkKTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRoaXMuZXZlbnRIaWRlTW9kYWwpO1xuICB9XG5cbiAgaGFuZGxlckNsb3NlTW9kYWwoZSkge1xuICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmRpc21pc3MgPT09ICdtb2RhbEZ1bmMnIHx8IGUudGFyZ2V0LmRhdGFzZXQuaGFuZGxlcikge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5lbGVtTW9kYWwucGFyZW50RWxlbWVudCkge1xuICAgICAgdGhpcy5lbGVtTW9kYWwucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmVsZW1Nb2RhbCk7XG4gICAgfVxuICAgIHRoaXMuZWxlbU1vZGFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAnY2xpY2snLFxuICAgICAgdGhpcy5oYW5kbGVyQ2xvc2VNb2RhbC5iaW5kKHRoaXMpLFxuICAgICk7XG4gIH1cblxuICBzZXRDb250ZW50KGh0bWwpIHtcbiAgICB0aGlzLmVsZW1Nb2RhbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tb2RhbEZ1bmM9XCJjb250ZW50XCJdJykuaW5uZXJIVE1MID0gaHRtbDtcbiAgfVxuXG4gIHNldFRpdGxlKHRleHQpIHtcbiAgICB0aGlzLmVsZW1Nb2RhbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tb2RhbEZ1bmM9XCJ0aXRsZVwiXScpLmlubmVySFRNTCA9IHRleHQ7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlc2V0QXJyYXkoYXJyKSB7XG4gIHdoaWxlIChhcnIuY2hpbGRyZW4ubGVuZ3RoID4gMikge1xuICAgIGFyci5sYXN0Q2hpbGQucmVtb3ZlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBUYXNrc1RyYWNrZXIgZnJvbSAnLi9jb21wb25lbnRzL3Rhc2tzLXRyYWNrZXIvVGFza3NUcmFja2VyJztcblxuLyogZXNsaW50LWRpc2FibGUgKi9cbmNvbnNvbGUubG9nKCdpdCB3b3JrcyEnKTtcblxuY29uc3QgdGFza3NUcmFja2VyID0gbmV3IFRhc2tzVHJhY2tlcigpO1xudGFza3NUcmFja2VyLmJpbmRUb0RPTShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MtY29udGFpbmVyJykpO1xuXG5cbiIsImltcG9ydCBUYXNrSXRlbSBmcm9tICcuLi90YXNrLWl0ZW0vVGFza0l0ZW0nO1xuaW1wb3J0IHsgZmlsdGVyQnkgfSBmcm9tICcuLi8uLi91dGlscy9maWx0ZXInO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi4vdGFzay9UYXNrJztcbmltcG9ydCBNb2RhbCBmcm9tICcuLi9tb2RhbC9Nb2RhbCc7XG5pbXBvcnQgZ2VuZXJhdGVUYXNrVHJhY2tlck1hcmt1cCBmcm9tICcuL2dlbmVyYXRlLXRhc2tzLXRyYWNrZXItbWFya3VwJztcblxuaW1wb3J0ICcuL3Rhc2tzLXRyYWNrZXIuY3NzJztcbmltcG9ydCByZXNldEFycmF5IGZyb20gJy4uLy4uL3V0aWxzL3Jlc2V0QXJyYXknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrc1RyYWNrZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy50YXNrcyA9IFtdO1xuICAgIHRoaXMucGlubmVkVGFza3NFbCA9IFtdO1xuICAgIHRoaXMuYWxsVGFza3NFbCA9IFtdO1xuICAgIHRoaXMuaXNNb2RhbCA9IGZhbHNlO1xuXG4gICAgdGhpcy5pbml0TW9kYWxMaXN0ZW5lcigpO1xuICB9XG5cbiAgYmluZFRvRE9NKGNvbnRhaW5lcikge1xuICAgIGlmICghKGNvbnRhaW5lciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb250YWluZXIgaXMgbm90IEhUTUxFbGVtZW50Jyk7XG4gICAgfVxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgdGhpcy5kcmF3VWkoKTtcbiAgfVxuXG4gIGNoZWNrQmluZGluZygpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJhY2tlciBub3QgYmluZCB0byBET00nKTtcbiAgICB9XG4gIH1cblxuICBkcmF3VWkoKSB7XG4gICAgdGhpcy5jaGVja0JpbmRpbmcoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgdGhpcy5waW5uZWRUYXNrc0VsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLnRhc2tzLXBpbm5lZCcpO1xuICAgIHRoaXMuYWxsVGFza3NFbCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1hbGwnKTtcbiAgICB0aGlzLnBpbm5lZE5vVGFza0VsID0gdGhpcy5waW5uZWRUYXNrc0VsLnF1ZXJ5U2VsZWN0b3IoJy5uby10YXNrcycpO1xuICAgIHRoaXMubm9BbGxUYXNrc0VsID0gdGhpcy5hbGxUYXNrc0VsLnF1ZXJ5U2VsZWN0b3IoJy5uby10YXNrcycpO1xuXG4gICAgdGhpcy5ldmVudHMoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBpdGVtSHRtbCA9IGdlbmVyYXRlVGFza1RyYWNrZXJNYXJrdXAoKTtcbiAgICB0aGlzLmNvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGl0ZW1IdG1sKTtcbiAgfVxuXG4gIGV2ZW50cygpIHtcbiAgICBjb25zdCBlbnRlckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWlkPSdlbnRlci10ZXh0J11cIik7XG4gICAgY29uc3QgZm9ybUVsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignZm9ybScpO1xuXG4gICAgZm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB0aGlzLm9uU3VibWl0KGUpKTtcbiAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLm9uQ2xpY2soZSkpO1xuICAgIGVudGVyRWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB0aGlzLm9uSW5wdXQoZW50ZXJFbCkpO1xuICB9XG5cbiAgaW5pdE1vZGFsTGlzdGVuZXIoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBlLnRhcmdldC5kYXRhc2V0LmhhbmRsZXIgPT09ICdtb2RhbEhhbmRsZXJDYW5jZWwnXG4gICAgICAgICYmIHRoaXMuY3VycmVudE1vZGFsXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TW9kYWwuaGlkZSgpO1xuICAgICAgICB0aGlzLmlzTW9kYWwgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZVRhc2sodmFsdWUpIHtcbiAgICBjb25zdCB0YXNrID0gbmV3IFRhc2soJ25vJywgdmFsdWUsIERhdGUubm93KCkpO1xuICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgICByZXR1cm4gdGFzaztcbiAgfVxuXG4gIG9uQ2xpY2soZSkge1xuICAgIGlmIChlLnRhcmdldC50eXBlID09PSAndGV4dCcpIHtcbiAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnRBbGwgPSBlLnRhcmdldC5jbG9zZXN0KCcudGFza3MtYWxsJyk7XG4gICAgICBpZiAocGFyZW50RWxlbWVudEFsbCkge1xuICAgICAgICB0aGlzLnJlZHJhdyhlLCAneWVzJywgdGhpcy5waW5uZWRUYXNrc0VsLCB0aGlzLnBpbm5lZE5vVGFza0VsLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJlbnRFbGVtZW50UGluID0gZS50YXJnZXQuY2xvc2VzdCgnLnRhc2tzLXBpbm5lZCcpO1xuXG4gICAgICBpZiAocGFyZW50RWxlbWVudFBpbikge1xuICAgICAgICB0aGlzLnJlZHJhdyhlLCAnbm8nLCB0aGlzLmFsbFRhc2tzRWwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uU3VibWl0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gZS5jdXJyZW50VGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1pZD0nZW50ZXItdGV4dCddXCIpO1xuXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhpcy5zaG93TW9kYWxNZXNzYWdlKCdXcml0ZSB0ZXh0IScsICfinI0nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNyZWF0ZVRhc2sodmFsdWUpO1xuICAgIHRoaXMubm9BbGxUYXNrc0VsLmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XG4gICAgdGhpcy5zaG93QWxsVGFza3MoJ25vJyk7XG5cbiAgICBlLmN1cnJlbnRUYXJnZXQucXVlcnlTZWxlY3RvcihcIltkYXRhLWlkPSdlbnRlci10ZXh0J11cIikudmFsdWUgPSAnJztcbiAgfVxuXG4gIG9uSW5wdXQoZWxlbWVudCkge1xuICAgIHJlc2V0QXJyYXkodGhpcy5hbGxUYXNrc0VsKTtcblxuICAgIGNvbnN0IGZpbHRlckFycmF5ID0gZmlsdGVyQnkodGhpcy5zb3J0KCksIGVsZW1lbnQudmFsdWUpO1xuICAgIGlmIChmaWx0ZXJBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMubm9BbGxUYXNrc0VsLmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm9BbGxUYXNrc0VsLmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XG4gICAgfVxuICAgIGZpbHRlckFycmF5LmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjb25zdCB0YXNrSXRlbSA9IG5ldyBUYXNrSXRlbShlbCk7XG4gICAgICB0aGlzLmFsbFRhc2tzRWwuYXBwZW5kQ2hpbGQodGFza0l0ZW0uZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93QWxsVGFza3MocGluKSB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSB7XG4gICAgICBubzoge1xuICAgICAgICBhcnJheTogdGhpcy5hbGxUYXNrc0VsLFxuICAgICAgICBhY3RpdmVFbDogdGhpcy5waW5uZWROb1Rhc2tFbCxcbiAgICAgICAgaW5hY3RpdmVFbDogdGhpcy5ub0FsbFRhc2tzRWwsXG4gICAgICAgIGlzQ2xhc3M6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHllczoge1xuICAgICAgICBhcnJheTogdGhpcy5waW5uZWRUYXNrc0VsLFxuICAgICAgICBhY3RpdmVFbDogdGhpcy5ub0FsbFRhc2tzRWwsXG4gICAgICAgIGluYWN0aXZlRWw6IHRoaXMucGlubmVkTm9UYXNrRWwsXG4gICAgICAgIGlzQ2xhc3M6IHRydWUsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCB7XG4gICAgICBhcnJheSwgYWN0aXZlRWwsIGluYWN0aXZlRWwsIGlzQ2xhc3MsXG4gICAgfSA9IHNldHRpbmdzW3Bpbl07XG5cbiAgICBjb25zdCB0YXNrc0FmdGVyRmlsdGVyID0gdGhpcy5zb3J0KHBpbik7XG4gICAgaWYgKHRhc2tzQWZ0ZXJGaWx0ZXIubGVuZ3RoICE9PSAwKSB7XG4gICAgICBpbmFjdGl2ZUVsLmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgaWYgKHRhc2tzQWZ0ZXJGaWx0ZXIubGVuZ3RoID09PSB0aGlzLnRhc2tzLmxlbmd0aCkge1xuICAgICAgYWN0aXZlRWwuY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUnKTtcbiAgICB9XG5cbiAgICB0YXNrc0FmdGVyRmlsdGVyLmZvckVhY2goKHRhc2tEYXRhKSA9PiB7XG4gICAgICBjb25zdCB0YXNrSXRlbSA9IG5ldyBUYXNrSXRlbSh0YXNrRGF0YSwgaXNDbGFzcyk7XG4gICAgICBhcnJheS5hcHBlbmRDaGlsZCh0YXNrSXRlbS5lbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlZHJhdyhlLCBwaW4sIGFycmF5KSB7XG4gICAgY29uc3QgcGFyZW50TGlzdEVsID0gZS50YXJnZXQuY2xvc2VzdCgnLnRhc2staXRlbScpO1xuXG4gICAgY29uc3QgdGFza1RvVXBkYXRlID0gdGhpcy50YXNrcy5maW5kKFxuICAgICAgKHRhc2spID0+IHRhc2suaWQgPT09ICtwYXJlbnRMaXN0RWwuaWQsXG4gICAgKTtcbiAgICBpZiAodGFza1RvVXBkYXRlKSB7XG4gICAgICB0YXNrVG9VcGRhdGUucGluID0gcGluO1xuICAgIH1cblxuICAgIHBhcmVudExpc3RFbC5yZW1vdmUoKTtcblxuICAgIHJlc2V0QXJyYXkoYXJyYXkpO1xuICAgIHRoaXMuc2hvd0FsbFRhc2tzKHBpbik7XG4gIH1cblxuICBzb3J0KHBpbiA9ICdubycpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrcy5maWx0ZXIoKHRhc2spID0+IHRhc2sucGluID09PSBwaW4pO1xuICB9XG5cbiAgc2hvd01vZGFsTWVzc2FnZShtZXNzYWdlLCB1bmljb2RlKSB7XG4gICAgaWYgKHRoaXMuaXNNb2RhbCkgcmV0dXJuO1xuICAgIHRoaXMuaXNNb2RhbCA9IHRydWU7XG4gICAgdGhpcy5zaG93TW9kYWwobWVzc2FnZSwgdW5pY29kZSk7XG4gIH1cblxuICBzaG93TW9kYWwobWVzc2FnZSwgdW5pY29kZSkge1xuICAgIHRoaXMuY3VycmVudE1vZGFsID0gbmV3IE1vZGFsKHtcbiAgICAgIHRpdGxlOiBtZXNzYWdlLFxuICAgICAgY29udGVudDogdW5pY29kZSxcbiAgICAgIGZvb3RlckJ1dHRvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiAnYnRuIGJ0bl9fY2FuY2VsJyxcbiAgICAgICAgICB0ZXh0OiAnQ2xvc2UnLFxuICAgICAgICAgIGhhbmRsZXI6ICdtb2RhbEhhbmRsZXJDYW5jZWwnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KTtcbiAgICB0aGlzLmN1cnJlbnRNb2RhbC5zaG93KCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlVGFza1RyYWNrZXJNYXJrdXAoKSB7XG4gIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwidGFza3Mtd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFza3MtYm9hcmRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFzay1mb3JtXCI+XG4gICAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwidGFzay10aXRsZSB0YXNrLXRpdGxlX2xhYmVsXCIgZm9yPVwiZW50ZXItdGV4dFwiPlRPUCBUYXNrczwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInRhc2stZm9ybV9faW5wdXRcIiBkYXRhLWlkPVwiZW50ZXItdGV4dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImVudGVyLXRleHRcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgdGV4dCBoZXJlXCI+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFza3MtcGlubmVkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tzLXRpdGxlXCI+UGlubmVkOjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJuby10YXNrc1wiPk5vIHBpbm5lZCB0YXNrczwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tzLWFsbFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrcy10aXRsZVwiPkFsbCBUYXNrczo8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibm8tdGFza3NcIj5ObyB0YXNrcyBmb3VuZDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGA7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY29udGFpbnNUZXh0KGRhdGEsIHNlYXJjaCkge1xuICBjb25zdCBjbGVhbiA9IHNlYXJjaC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIGRhdGEudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhjbGVhbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJCeSh0YXNrcywgc2VhcmNoKSB7XG4gIHJldHVybiB0YXNrcy5maWx0ZXIoKHRhc2spID0+IGNvbnRhaW5zVGV4dCh0YXNrLnRleHQsIHNlYXJjaCkpO1xufVxuIl0sIm5hbWVzIjpbIlRhc2tJdGVtIiwiY29uc3RydWN0b3IiLCJkYXRhIiwiaXNDbGFzcyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInRoaXMiLCJlbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImVsIiwiZG9jdW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJwaW4iLCJpZCIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzSW5wdXQiLCJpbm5lckhUTUwiLCJ0ZXh0IiwiVGFzayIsIk1vZGFsIiwib3B0aW9ucyIsImVsZW1Nb2RhbCIsImV2ZW50U2hvd01vZGFsIiwiZXZlbnRIaWRlTW9kYWwiLCJoaWRpbmciLCJkZXN0cm95ZWQiLCJhbmltYXRpb25TcGVlZCIsImNyZWF0ZU1vZGFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZXJDbG9zZU1vZGFsIiwiYmluZCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwibW9kYWxIVE1MIiwibW9kYWxGb290ZXJIVE1MIiwicmVwbGFjZSIsInRpdGxlIiwiY29udGVudCIsImZvb3RlckJ1dHRvbnMiLCJidXR0b24iLCJtb2RhbEZvb3RlckJ1dHRvbiIsImNsYXNzIiwiaGFuZGxlciIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInNob3ciLCJkaXNwYXRjaEV2ZW50IiwiaGlkZSIsInJlbW92ZSIsInNldFRpbWVvdXQiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsImRpc21pc3MiLCJkZXN0cm95IiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldENvbnRlbnQiLCJodG1sIiwicXVlcnlTZWxlY3RvciIsInNldFRpdGxlIiwicmVzZXRBcnJheSIsImFyciIsImNoaWxkcmVuIiwibGFzdENoaWxkIiwiY29uc29sZSIsImxvZyIsImNvbnRhaW5lciIsInRhc2tzIiwicGlubmVkVGFza3NFbCIsImFsbFRhc2tzRWwiLCJpc01vZGFsIiwiaW5pdE1vZGFsTGlzdGVuZXIiLCJiaW5kVG9ET00iLCJIVE1MRWxlbWVudCIsIkVycm9yIiwiZHJhd1VpIiwiY2hlY2tCaW5kaW5nIiwicmVuZGVyIiwicGlubmVkTm9UYXNrRWwiLCJub0FsbFRhc2tzRWwiLCJldmVudHMiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJlbnRlckVsIiwib25TdWJtaXQiLCJvbkNsaWNrIiwib25JbnB1dCIsImN1cnJlbnRNb2RhbCIsImNyZWF0ZVRhc2siLCJ2YWx1ZSIsInRhc2siLCJEYXRlIiwibm93IiwicHVzaCIsInR5cGUiLCJjbG9zZXN0IiwicmVkcmF3IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50VGFyZ2V0Iiwic2hvd0FsbFRhc2tzIiwic2hvd01vZGFsTWVzc2FnZSIsImZpbHRlckFycmF5Iiwic29ydCIsInNlYXJjaCIsImZpbHRlciIsImNsZWFuIiwidHJpbSIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJjb250YWluc1RleHQiLCJmb3JFYWNoIiwidGFza0l0ZW0iLCJzZXR0aW5ncyIsIm5vIiwiYXJyYXkiLCJhY3RpdmVFbCIsImluYWN0aXZlRWwiLCJ5ZXMiLCJ0YXNrc0FmdGVyRmlsdGVyIiwidGFza0RhdGEiLCJwYXJlbnRMaXN0RWwiLCJ0YXNrVG9VcGRhdGUiLCJmaW5kIiwibWVzc2FnZSIsInVuaWNvZGUiLCJzaG93TW9kYWwiXSwic291cmNlUm9vdCI6IiJ9