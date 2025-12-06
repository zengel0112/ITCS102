# PDF Даалгаврууд - Python Хэрэгжүүлэлт

Энэхүү проеekt нь PDF дээрх бүх Kara даалгавруудыг Python хэлээр хэрэгжүүлсэн байна.

## Даалгаврууд

### Даалгавар 1 - Follow trees (simple)
**Файл:** `task1_follow_trees.py`

Кара ойг тойрон хамгаалах програм. Кара ойг цагийн зүүний дагуу эсвэл эсрэг тийш тойрон явна.

**Функцүүд:**
- `task1_follow_trees_clockwise(kara)` - Цагийн зүүний дагуу
- `task1_follow_trees_counterclockwise(kara)` - Эсрэг тийш

### Даалгавар 2 - Pacman with cloverleaves (medium)
**Файл:** `task2_pacman_cloverleaves.py`

Караг навчин замын дагуу явж навчийг түүж идэх байхаар програмчилна. Кара модны өмнөх навч дээр очиход програмыг зогсооно.

**Функцүүд:**
- `task2_pacman_cloverleaves(kara)` - Бүрэн хувилбар
- `task2_pacman_cloverleaves_simplified(kara)` - Хялбаршуулсан (нэг төлөвтэй)

### Даалгавар 3 - Slamon (medium)
**Файл:** `task3_slamon.py`

Кара модны хоорондуур сүлжиж явна. Дараагийн сүлжих мод байхгүй бол буцан эргээд сүлжиж явна.

**Функцүүд:**
- `task3_slamon(kara)` - Хоёр төлөвтэй хувилбар
- `task3_slamon_improved(kara)` - Сайжруулсан хувилбар

**Анхаар:** Шийдэхэд хамгийн багадаа хоёр төлөв хэрэгтэй.

### Даалгавар 4 - Chessboard pattern (medium)
**Файл:** `task4_chessboard_pattern.py`

Кара шатрын хөлөг зурдаг байна. Хоёр ялгаатай аргаар шатрын хөлөг зурж болно.

**Функцүүд:**
- `task4_chessboard_pattern_method1(kara)` - Арга 1: Мөр мөрөөр
- `task4_chessboard_pattern_method2(kara)` - Арга 2: Зигзаг хэлбэрээр

**Анхаар:** Програм орчны өргөн болон өндөр нь тэгш эсвэл сондгой байхад ажиллах ёстой.

### Даалгавар 5 - Mazes (simple)
**Файл:** `task5_mazes.py`

Кара энгийн төөрдөг байшинд навч хайна. Мөр бүрт дээд мөр рүү орох яг нэг гарц байна.

**Функцүүд:**
- `task5_mazes(kara)` - Бүрэн хувилбар
- `task5_mazes_2states(kara)` - Хоёр төлөвтэй хувилбар
- `task5_mazes_1state(kara)` - Нэг төлөвтэй хувилбар

**Анхаар:** Нэг эгнээнд олон нүх байвал програм зөв ажиллахгүй байж болно.

### Даалгавар 6 - Drawing triangles (medium)
**Файл:** `task6_drawing_triangles.py`

Хэрэглэгч зогсоох хүртэл илүү том гурвалжинг тасралтгүй зурсаар байх болгож Караг програмчилна.

**Функцүүд:**
- `task6_drawing_triangles(kara)` - Хязгааргүй хувилбар
- `task6_drawing_triangles_with_stop(kara, max_size)` - Хязгаартай хувилбар

**Туслах функцүүд:**
- `draw_triangle(kara, size)` - Гурвалжин зурах
- `draw_triangle_simple(kara, size)` - Хялбаршуулсан гурвалжин
- `move_to_next_triangle_position(kara, current_size)` - Дараагийн байрлал руу шилжих

## Хэрэглээ

Эдгээр функцүүдийг ашиглахын тулд `kara` объект шаардлагатай. Жишээ:

```python
from kara import Kara
from task1_follow_trees import task1_follow_trees_clockwise

kara = Kara()
task1_follow_trees_clockwise(kara)
```

## Анхааруулга

Эдгээр файлууд нь `kara` объект шаарддаг бөгөөд дараах методүүд байх ёстой:
- `kara.treeFront()` - урд талд мод байгаа эсэх
- `kara.treeLeft()` - зүүн талд мод байгаа эсэх
- `kara.treeRight()` - баруун талд мод байгаа эсэх
- `kara.onLeaf()` - навч дээр байгаа эсэх
- `kara.move()` - урагш хөдлөх
- `kara.turnLeft()` - зүүн эргэх
- `kara.turnRight()` - баруун эргэх
- `kara.putLeaf()` - навч тавих
- `kara.removeLeaf()` - навч авах

## Тэмдэглэл

- Зарим даалгаварт хэд хэдэн хувилбар байна (энгийн, сайжруулсан, нэг төлөвтэй гэх мэт)
- Даалгавар бүрт тайлбар, заавар байна
- Зарим даалгаварт нэмэлт асуултууд байна

