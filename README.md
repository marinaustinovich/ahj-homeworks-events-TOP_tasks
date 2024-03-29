### TOP Tasks

[![Build status](https://ci.appveyor.com/api/projects/status/mjr6wascg6wb5kiq/branch/main?svg=true)](https://ci.appveyor.com/project/marinaustinovich/ahj-homeworks-events-top-tasks/branch/main)

deployment: https://marinaustinovich.github.io/ahj-homeworks-events-TOP_tasks/
#### Легенда

Трекер задач, в котором есть возможность отображать назначенные пользователю задачи. Выглядит это примерно так:

![](./src/img/tasks.png)

Проектировщики и заказчик приложения решили, что пользователь может фильтровать и добавлять задачи с помощью поля ввода. Некоторые задачи можно закреплять (pin).

#### Описание

1. Добавляются задачи при следующих условиях: в поле ввода есть текст, и пользователь нажал Enter. Если текста нет, но пользователь всё равно нажал Enter, должно выводиться сообщение об ошибке.
2. Задача добавляется в блок All Tasks, а поле ввода очищается.
3. Когда закреплённых задач нет, в блоке Pinned должно отображаться No pinned tasks.
4. Когда закреплённые задачи есть, они отображаются в блоке Pinned и не участвуют в процедуре фильтрации:
    * их отображение никак не зависит от состояния фильтра,
    * они не отображаются в блоке All Tasks.
5. При пустом поле ввода в блоке All Tasks отображаются все задачи с учётом условий предыдущего пункта (т. е. все, кроме Pinned).
6. При изменении поля ввода содержимое блока All Tasks автоматически пересчитывается: отображаются только те задачи, название которых начинается с того, что введено в поле ввода, без учёта регистра.
7. Если значению поля ввода не удовлетворяет ни одна из задач, то в блоке All Tasks отображается No tasks found.
8. При выставлении переключателя (круглая иконка справа) задача из блока All Tasks попадает в Pinned.
9.  При снятии переключателя (круглая иконка справа) задача из блока Pinned попадает в блок All Tasks. При этом учитывайте состояние фильтра.

Все задачи хранятся в едином массиве в памяти JS. Каждая задача из себя представляет объект класса Task. Перестройка DOM-дерева происходит на основании объектов, хранящихся в памяти.

Всё собирается через Webpack и выкладывается на GitHub Pages через CI.
