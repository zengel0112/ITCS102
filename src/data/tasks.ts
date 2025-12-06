import { Task } from '../types/task'

export const tasksPage1: Task[] = [
  {
    title: 'Даалгавар 1 – Kara and the cloverleafs.',
    description: 'Чигээрээ явахад мод байгаа гэдгийг Кара мэднэ. Хэрэв ямар нэгэн нүдэнд навч байгаа бол Кара түүнийг авах хэрэгтэй, харин байхгүй бол нэгийг тавих хэрэгтэй. Модны дэргэд очиход, програм дуусах ёстой.',
    code: `<span class="text-code-blue">while</span> <span class="text-code-blue">not</span> kara.treeFront():
    <span class="text-code-blue">if</span> kara.onLeaf():
        kara.<span class="text-code-yellow">removeLeaf</span>()
    <span class="text-code-blue">else</span>:
        kara.<span class="text-code-yellow">putLeaf</span>()
    kara.<span class="text-code-yellow">move</span>()`,
    videoSrc: '/gifs/karap1/kara1.webm',
    mapping: [
      [0.0, 6.0, 0],
      [2.5, 5.0, 1],
      [2.5, 5.0, 2],
      [0.0, 2.5, 4],
      [5.0, 5.5, 4],
      [0.0, 2.5, 3],
      [5.0, 5.5, 3],
      [0.0, 6.0, 5],
    ],
  },
  {
    title: 'Даалгавар 2a – Kara, the tunnel seeker I.',
    description: 'Kaрa нэгэн шулуун хонгилын орох хэсгийг хайна. Чанх урагш явахад өмнө нь хонгил байгаа гэдгийг тэр мэднэ. Хонгил доторх эхний нүдэнд түүнийг хүргээд зогсоох програмыг бичнэ үү. Гэхдээ болгоомжтой: Зарим хонгилуудын нэг талд нь хана байна, заримдаа зүүн, заримдаа баруун талд нь!',
    code: `<span class="text-code-blue">while</span> <span class="text-code-blue">not</span> kara.treeFront():
    <span class="text-code-blue">if</span> <span class="text-code-blue">not</span> (kara.treeLeft() <span class="text-code-blue">and</span> kara.treeRight()):
        kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">else</span>:
        <span class="text-code-blue">break</span>`,
    videoSrc: '/gifs/karap1/kara2a.webm',
    mapping: [
      [0.0, 2.3, 0],
      [0.0, 2.3, 1],
      [0.0, 2.3, 2],
      [2.3, 4.0, 3],
      [2.3, 4.0, 4],
    ],
  },
  {
    title: 'Даалгавар 2b – Kara, the tunnel seeker II.',
    description: 'Kaрa тэр хонгилын гарцыг олохыг хүсч байна. Энэ үйлдлийг гүйцэтгэхийн тулд тэр эхлээд хонгил дундуур явах хэрэгтэй. Хонгилоос гараад эхний нүдэнд түүнийг зогсоох програмыг бичнэ үү. Хонгилын төгсгөл хүртэл явж болохгүйг анхаарна уу! Санамж: Шийдэл хоёр төлвийг шаардана! Яагаад нэг төлвөөр шийдэх боломжгүй вэ гэдэг талаар бодож үзнэ үү!, Stop State not included!',
    code: `<span class="text-code-blue">while</span> <span class="text-code-blue">not</span> kara.treeFront():
    kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">if</span> kara.treeLeft() <span class="text-code-blue">and</span> kara.treeRight():
        <span class="text-code-blue">while</span> kara.treeLeft() <span class="text-code-blue">and</span> kara.treeRight():
            kara.<span class="text-code-yellow">move</span>()
        <span class="text-code-blue">if</span> <span class="text-code-blue">not</span> kara.treeFront():
            <span class="text-code-blue">break</span>`,
    videoSrc: '/gifs/karap1/kara2b.webm',
    mapping: [
      [0.0, 3.0, 0],
      [0.0, 3.0, 1],
      [3.0, 7.8, 2],
      [3.0, 7.8, 3],
      [3.0, 7.8, 4],
      [7.8, 11.0, 5],
      [7.8, 11.0, 6],
    ],
  },
  {
    title: 'Даалгавар 3a – Searching cloverleafs in a forrest I.',
    description: 'Кара хошингорын навч хайна. Кара чанх урд нь нэг навч байгаа гэдгийг мэдэх бөгөөд тэр модыг тойрч гарах ёстой. Аз болоход зэрэгцсэн хоёр мод ерөөсөө байхгүй. Түүнийг навч руу аваачих програмыг бичнэ үү!',
    code: `<span class="text-code-blue">while</span> <span class="text-code-blue">not</span> kara.onLeaf():
    <span class="text-code-blue">if</span> <span class="text-code-blue">not</span> kara.treeFront():
        kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">else</span>:
        kara.<span class="text-code-yellow">turnLeft</span>()
        kara.<span class="text-code-yellow">move</span>()
        kara.<span class="text-code-yellow">turnRight</span>()
        kara.<span class="text-code-yellow">move</span>()
        kara.<span class="text-code-yellow">move</span>()
        kara.<span class="text-code-yellow">turnRight</span>()
        kara.<span class="text-code-yellow">move</span>()
        kara.<span class="text-code-yellow">turnLeft</span>()`,
    videoSrc: '/gifs/karap1/kara3a.webm',
    mapping: [
      [0.0, 2.3, 0], [8.6, 9.0, 0],
      [0.0, 2.3, 1], [8.6, 9.0, 1],
      [0.0, 2.3, 2], [8.6, 9.0, 2],
      [2.3, 8.6, 3],
      [2.3, 8.6, 4],
      [2.3, 8.6, 5],
      [2.3, 8.6, 6],
      [2.3, 8.6, 7],
      [2.3, 8.6, 8],
      [2.3, 8.6, 9],
      [2.3, 8.6, 10],
      [2.3, 8.6, 11],
    ],
  },
  {
    title: 'Даалгавар 3b – Searching cloverleafs in a forrest II',
    description: 'Даалгавар 3a-д зохиосон програмыг хэд хэдэн зэрэгцсэн мод байхад ч Караг навчинд хүргэдэг болгож програмыг өргөтгөнө үү. Санамж: Энэ даалгаврын шийдэлд хоёр төлөв шаардлагатай. Яагаад нэг төлөв хангалтгүй вэ?',
    code: `<span class="text-code-blue">while</span> <span class="text-code-blue">not</span> kara.onLeaf():
    <span class="text-code-blue">if</span> <span class="text-code-blue">not</span> kara.treeFront():
        kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">else</span>:
        kara.<span class="text-code-yellow">turnLeft</span>()
        kara.<span class="text-code-yellow">move</span>()
        kara.<span class="text-code-yellow">turnRight</span>()
        kara.<span class="text-code-yellow">move</span>()
        <span class="text-code-blue">while</span> kara.treeRight():
            kara.<span class="text-code-yellow">move</span>()
            <span class="text-code-blue">if</span> <span class="text-code-blue">not</span> kara.treeRight():
                <span class="text-code-blue">break</span>
        kara.<span class="text-code-yellow">turnRight</span>()
        kara.<span class="text-code-yellow">move</span>()
        kara.<span class="text-code-yellow">turnLeft</span>()`,
    videoSrc: '/gifs/karap1/kara3b.webm',
    mapping: [
      [0.0, 2.3, 0], [10.3, 10.8, 0],
      [0.0, 2.3, 1], [10.3, 10.8, 1],
      [0.0, 2.3, 2], [10.3, 10.8, 2],
      [2.3, 3.0, 3], [4.7, 5.7, 3], [7.8, 8.5, 3],
      [2.3, 3.0, 4], [4.7, 5.7, 4], [7.8, 8.5, 4],
      [2.3, 3.0, 5], [4.7, 5.7, 5], [7.8, 8.5, 5],
      [2.3, 3.0, 6], [4.7, 5.7, 6], [7.8, 8.5, 6],
      [2.3, 3.0, 7], [4.7, 5.7, 7], [7.8, 8.5, 7],
      [3.0, 3.4, 8], [5.7, 6.5, 8], [8.5, 9.3, 8],
      [3.0, 3.4, 9], [5.7, 6.5, 9], [8.5, 9.3, 9],
      [3.4, 3.9, 10], [6.5, 7.0, 10], [9.3, 9.8, 10],
      [3.4, 3.9, 11], [6.5, 7.0, 11], [9.3, 9.8, 11],
      [3.9, 4.7, 12], [7.0, 7.8, 12], [9.8, 10.3, 12],
      [3.9, 4.7, 13], [7.0, 7.8, 13], [9.8, 10.3, 13],
      [3.9, 4.7, 14], [7.0, 7.8, 14], [9.8, 10.3, 14],
    ],
  },
  {
    title: 'Даалгавар 4 – The Labyrinth.',
    description: 'Kaрa модоор хүрээлсэн төөрдөг байшинд байна. Төөрдөг байшингийн төгсгөлд түүнийг аваачих програмыг бичнэ үү! Тэр тэнд нэг навч тэмдэг болгож тавина. Ингээд програм зогсоно.',
    code: `<span class="text-code-blue">while</span> True:
    <span class="text-code-blue">if</span> <span class="text-code-blue">not</span> kara.treeFront():
        kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">elif</span> <span class="text-code-blue">not</span> kara.treeRight():
        kara.<span class="text-code-yellow">turnRight</span>()
        kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">else</span>:
        kara.<span class="text-code-yellow">turnLeft</span>()
    
    <span class="text-code-blue">if</span> kara.treeFront() <span class="text-code-blue">and</span> kara.treeLeft() <span class="text-code-blue">and</span> kara.treeRight():
        kara.<span class="text-code-yellow">putLeaf</span>()
        <span class="text-code-blue">break</span>`,
    videoSrc: '/gifs/karap1/kara4.webm',
    mapping: [
      [0.0, 16.0, 0],
      [0.0, 16.0, 1],
      [0.0, 16.0, 2],
      [5.0, 6.8, 3], [8.3, 8.9, 3], [10.3, 12.2, 3], [15.0, 15.6, 3],
      [5.0, 6.8, 4], [8.3, 8.9, 4], [10.3, 12.2, 4], [15.0, 15.6, 4],
      [5.0, 6.8, 5], [8.3, 8.9, 5], [10.3, 12.2, 5], [15.0, 15.6, 5],
      [2.4, 4.0, 6], [6.9, 7.5, 6], [12.5, 13.2, 6], [14.0, 14.6, 6],
      [2.4, 4.0, 7], [6.9, 7.5, 7], [12.5, 13.2, 7], [14.0, 14.6, 7],
      [16.0, 20.0, 8],
      [16.0, 20.0, 9],
      [16.0, 20.0, 10],
    ],
  },
]

export const tasksPage2: Task[] = [
  {
    title: 'Даалгавар 1 – Follow trees (clockwise).',
    description: 'Кара нь ойг тойрон хамгаалах програм бичнэ үү. Кара нь ойг цагийн зүүний дагуу тасралтгүй тойрон явна. Заавар: Нэг төлөв хангалттай. Аль болох цөөн мэдрүүр, тухайн төлөвт аль болох цөөн шилжилттэй хийхийг оролдоно уу.',
    code: `<span class="text-code-blue">while</span> True:
    <span class="text-code-blue">if</span> <span class="text-code-blue">not</span> kara.treeFront():
        <span class="text-code-blue">if</span> <span class="text-code-blue">not</span> kara.treeRight():
            kara.<span class="text-code-yellow">turnRight</span>()
        kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">elif</span> <span class="text-code-blue">not</span> kara.treeRight():
        kara.<span class="text-code-yellow">turnRight</span>()
        kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">else</span>:
        kara.<span class="text-code-yellow">turnLeft</span>()`,
    videoSrc: '/gifs/karap2/kara1clockwise.webm',
    mapping: [],
  },
  {
    title: '(counterclockwise).',
    description: 'Кара нь ойг цагийн зүүний эсрэг тасралтгүй тойрон явна.',
    code: `<span class="text-code-blue">while</span> True:
    <span class="text-code-blue">if</span> <span class="text-code-blue">not</span> kara.treeFront():
        <span class="text-code-blue">if</span> <span class="text-code-blue">not</span> kara.treeLeft():
            kara.<span class="text-code-yellow">turnLeft</span>()
        kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">elif</span> <span class="text-code-blue">not</span> kara.treeLeft():
        kara.<span class="text-code-yellow">turnLeft</span>()
        kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">else</span>:
        kara.<span class="text-code-yellow">turnRight</span>()`,
    videoSrc: '/gifs/karap2/kara1counterclockwise.webm',
    mapping: [],
  },
  {
    title: 'Даалгавар 2 – Pacman with cloverleaves (medium) - 1.',
    description: 'Караг навчин замын дагуу явж навчийг түүж идэх байхаар програмчилна уу. Кара модны өмнөх навч дээр очиход програмыг зогсооно. Учир нь навч модны дагуу зэрэгцэн ургадаггүй гэж үзнэ.',
    code: `<span class="text-code-blue">while</span> <span class="text-code-blue">not</span> kara.treeFront():
    <span class="text-code-blue">if</span> kara.onLeaf():
        kara.<span class="text-code-yellow">removeLeaf</span>()
    kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">if</span> <span class="text-code-blue">not</span> kara.onLeaf():
        kara.<span class="text-code-yellow">turnLeft</span>()
        kara.<span class="text-code-yellow">turnLeft</span>()
        kara.<span class="text-code-yellow">move</span>()
        kara.<span class="text-code-yellow">turnRight</span>()`,
    videoSrc: '/gifs/karap2/kara2-1.webm',
    mapping: [],
  },
  {
    title: 'Өөрийн зохиосон програмыг ялгаатай замаар шалгав.',
    description: '',
    code: `<span class="text-code-blue">while</span> <span class="text-code-blue">not</span> kara.treeFront():
    <span class="text-code-blue">if</span> kara.onLeaf():
        kara.<span class="text-code-yellow">removeLeaf</span>()
    kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">if</span> <span class="text-code-blue">not</span> kara.onLeaf():
        kara.<span class="text-code-yellow">turnLeft</span>()
        kara.<span class="text-code-yellow">turnLeft</span>()
        kara.<span class="text-code-yellow">move</span>()
        kara.<span class="text-code-yellow">turnRight</span>()`,
    videoSrc: '/gifs/karap2/kara2-2.webm',
    mapping: [],
  },
  {
    title: 'Даалгавар 3 – Slamon (medium) - 1.',
    description: 'Кара модны хоорондуур сүлжиж явна. Сүлжилтийн эхний байрлалыг зурагт харуулсан. Кара моднуудыг тасралтгүй сүлжих бөгөөд дараагийн сүлжих мод байхгүй бол буцан эргээд сүлжиж явна. Кара хичнээн урт зам туулахыг (хэдэн мод байгааг) мэдэхгүй. Мөн Карад моднууд босоо эсвэл хэвтээ байрлалаар байрласан эсэх нь чухал биш. Нэмэлт асуулт: Шийдэхэд хамгийн багадаа хоёр төлөв хэрэгтэй. Яагаад цөөхнөөр болохгүй вэ?',
    code: `<span class="text-code-blue">while</span> True:
    <span class="text-code-blue">while</span> kara.treeLeft() <span class="text-code-blue">and</span> <span class="text-code-blue">not</span> kara.treeRight():
        kara.<span class="text-code-yellow">move</span>()
        kara.<span class="text-code-yellow">turnLeft</span>()
        kara.<span class="text-code-yellow">move</span>()
    kara.<span class="text-code-yellow">move</span>()
    kara.<span class="text-code-yellow">turnRight</span>()
    kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">while</span> <span class="text-code-blue">not</span> kara.treeLeft() <span class="text-code-blue">and</span> kara.treeRight():
        kara.<span class="text-code-yellow">move</span>()
        kara.<span class="text-code-yellow">turnRight</span>()
        kara.<span class="text-code-yellow">move</span>()
    kara.<span class="text-code-yellow">move</span>()
    kara.<span class="text-code-yellow">turnLeft</span>()
    kara.<span class="text-code-yellow">move</span>()`,
    videoSrc: '/gifs/karap2/kara3-1.webm',
    videoSrc2: '/gifs/karap2/kara3-2.webm',
    mapping: [],
  },
  {
    title: 'Даалгавар 4 – Chessboard pattern (medium) - 1.',
    description: 'Кара шатрын хөлөг зурдаг байна. Хоёр ялгаатай аргаар шатрын хөлөг зурж болно.',
    code: `put_leaf = <span class="text-code-blue">True</span>
turn_left = <span class="text-code-blue">True</span>

<span class="text-code-blue">while</span> <span class="text-code-blue">True</span>:
    <span class="text-code-blue">while</span> <span class="text-code-blue">not</span> kara.treeFront():
        <span class="text-code-blue">if</span> put_leaf:
            kara.<span class="text-code-yellow">putLeaf</span>()
        put_leaf = <span class="text-code-blue">not</span> put_leaf
        kara.<span class="text-code-yellow">move</span>()

    <span class="text-code-blue">if</span> put_leaf:
        kara.<span class="text-code-yellow">putLeaf</span>()
    put_leaf = <span class="text-code-blue">not</span> put_leaf

    <span class="text-code-blue">if</span> turn_left:
        kara.<span class="text-code-yellow">turnLeft</span>()
    <span class="text-code-blue">else</span>:
        kara.<span class="text-code-yellow">turnRight</span>()

    <span class="text-code-blue">if</span> kara.treeFront():
        <span class="text-code-blue">break</span>
    kara.<span class="text-code-yellow">move</span>()

    <span class="text-code-blue">if</span> turn_left:
        kara.<span class="text-code-yellow">turnLeft</span>()
    <span class="text-code-blue">else</span>:
        kara.<span class="text-code-yellow">turnRight</span>()

    turn_left = <span class="text-code-blue">not</span> turn_left`,
    videoSrc: '/gifs/karap2/kara4-1.webm',
    imageSrc: '/images/karahacker.png',
    mapping: [],
  },
  {
    title: '',
    description: '',
    videoSrc: '/gifs/karap2/kara4-2.webm',
    videoSrc2: '/gifs/karap2/kara4-3.webm',
  },
]

export const tasksPage3: Task[] = [
  {
    title: 'Даалгавар 3 – Спирал зурах',
    description: 'Дээр харуулсан навчин спиралийг зурдаг Кара-г програмчилна уу. Дотроос гадагш чиглэлд спиралийн өнцөг бүр өмнөхөөс нэгээр урт байна.',
    code: `length = 1
<span class="text-code-blue">while</span> <span class="text-code-blue">True</span>:
    <span class="text-code-blue">for</span> i <span class="text-code-blue">in</span> <span class="text-code-yellow">range</span>(length):
        kara.<span class="text-code-yellow">putLeaf</span>()
        kara.<span class="text-code-yellow">move</span>()
    kara.<span class="text-code-yellow">turnRight</span>()
    <span class="text-code-blue">if</span> kara.treeFront():
        <span class="text-code-blue">break</span>
    length += 1`,
    videoSrc: '/gifs/karap3/kara-spiral.webm',
    mapping: [],
  },
  {
    title: 'Даалгавар 4 – Зургийг урвуулах',
    description: 'Кара модны доторх навчин зургийн "Эсрэг дүрс"-ийг үүсгэдэг програмыг бичнэ үү. Навч байвал авна, байхгүй бол тавина. Эхлэхэд дандаа зүүн дээд өнцөгт баруун зүгт харсан байна.',
    code: `<span class="text-code-blue">for</span> y <span class="text-code-blue">in</span> <span class="text-code-yellow">range</span>(1, 8):
    <span class="text-code-blue">for</span> x <span class="text-code-blue">in</span> <span class="text-code-yellow">range</span>(1, 8):
        <span class="text-code-blue">if</span> world.<span class="text-code-yellow">isLeaf</span>(x, y):
            world.<span class="text-code-yellow">setLeaf</span>(x, y, <span class="text-code-blue">False</span>)
        <span class="text-code-blue">else</span>:
            world.<span class="text-code-yellow">setLeaf</span>(x, y, <span class="text-code-blue">True</span>)`,
    videoSrc: '/gifs/karap3/kara-invert.webm',
    mapping: [],
  },
  {
    title: 'Даалгавар 5 – Гурвалжин зурах',
    description: 'Кара-г гурвалжин зурдаг болгож програмчил! Хялбараар шийдэхийн тулд world.setLeaf(x,y,true/false) зааврыг хэрэглээрэй.',
    code: `start_row = 1
num_rows = 5

<span class="text-code-blue">for</span> row <span class="text-code-blue">in</span> <span class="text-code-yellow">range</span>(num_rows):
    y = start_row + row
    num_leaves = 2 * row + 1
    
    start_x = 5 - row
    
    <span class="text-code-blue">for</span> i <span class="text-code-blue">in</span> <span class="text-code-yellow">range</span>(num_leaves):
        x = start_x + i
        world.<span class="text-code-yellow">setLeaf</span>(x, y, <span class="text-code-blue">True</span>)`,
    videoSrc: '/gifs/karap3/kara-tirangle.webm',
    mapping: [],
  },
  {
    title: 'Даалгавар 6 – Төөрдөг байшин (хүнд)',
    description: 'Кара-г төөрдөг байшингаас гаргаж навч руу очуулах програм бичнэ үү. Кара навчийг олоод, газраас авдаг програмыг бичнэ. Энд Кара гарах үүдийн хажуугаар түүнийг ашиглахгүйгээр хэзээ ч өнгөрч явж болохгүй! Эхлэхэд Кара дандаа баруун тийш харсан байна.',
    code: `<span class="text-code-blue">while</span> <span class="text-code-blue">not</span> kara.onLeaf():
    <span class="text-code-blue">if</span> <span class="text-code-blue">not</span> kara.treeLeft():
        kara.<span class="text-code-yellow">turnLeft</span>()
        kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">elif</span> <span class="text-code-blue">not</span> kara.treeFront():
        kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">elif</span> <span class="text-code-blue">not</span> kara.treeRight():
        kara.<span class="text-code-yellow">turnRight</span>()
        kara.<span class="text-code-yellow">move</span>()
    <span class="text-code-blue">else</span>:
        kara.<span class="text-code-yellow">turnLeft</span>()
        kara.<span class="text-code-yellow">turnLeft</span>()

kara.<span class="text-code-yellow">removeLeaf</span>()`,
    videoSrc: '/gifs/karap3/kara-maze.webm',
    mapping: [],
  },
]


