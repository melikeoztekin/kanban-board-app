## Patika & Akbank React Bootcamp Bitirme Projesi

#### Patika & Akbank React Bootcamp final projesi Kanban board uygulaması.

### 🛠 Kullanılan Teknolojiler

<img src="https://img.shields.io/badge/React-09D2F6?style=for-the-badge&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-0076C6?style=for-the-badge&logo=typescript&logoColor=ffffff"/> <img src="https://img.shields.io/badge/React-Bootstrap-8A12FC?style=for-the-badge&logo=reactbootstrap&logoColor=white"/> <img src="https://img.shields.io/badge/HTML5-FC4011?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/CSS3-5A8AB9?style=for-the-badge&logo=css3&logoColor=white" />

- Projeyi kendi localinizde çalıştırmak için https://github.com/melikeoztekin/kanban-board-app.git adresini kopyalayarak terminal üzerinde `git clone <kopyalanan-adres>` şeklinde projenin bir kopyasını kendi bilgisayarınıza alabilirsiniz.

- Projede kullanılan tüm paketlerin kurulumu için oluşturulan projeyi editörde açarak terminale `npm install` yazalım ve paketlerin kurulumunu sağlayalım.

- Proje reposu içerisinde bulunan [patika-kanban-api-master](https://github.com/melikeoztekin/kanban-board-app/tree/main/patika-kanban-api-master) klasörü projemizde kullanmakta olduğumuz backend işlemlerinin yer aldığı dosyadır. Backend dosyasını çalışır duruma getirmek için Docker Desktop uygulamasını kullanmak gerekiyor. Backend klasörü içerisinde terminale `docker compose up` yazarak projenin containerlarını çalışır duruma getirelim.

- Son olarak projeyi `npm start` komutu ile editör terminali yardımı ile canlıya alalım. Artık projemizi tarayıcı üzerinde kullanmaya başlayabiliriz.

### :heavy_check_mark:kullanıcı kayıt ve giriş

Eğer bir hesabınız varsa, oturum açabilirsiniz. Bir hesabınız yoksa kullanıcı kaydı yapmanız gerekir. Eğer ilk defa bu repo içerisinde bulunan backend dosyasını kullanıyorsanız ilk yapmanız gereken bir kullanıcı kayıt işlemi olmalıdır.

### :heavy_check_mark:board ekleme, silme, güncelleme

İlk kez giriş yapan bir kullanıcıysanız ilk olarak size bir board eklemek için ilgili kart görünecektir. Ve siz ekleme yaptığınızda eklediğiniz board adını ekrana eklenecektir. Eğer daha önce giriş yaptınız ve board oluşturduysanız karşınıza size ait boardlar listelenir bunlara yeni bir board ekleyebilir, var olan boardu silebilir veya adını değiştirmek istediğiniz boarda düzenle seçeneğini kullanarak yeni bir isim verebilirsiniz.

### :heavy_check_mark:board içerisine liste ekleme, silme, güncelleme

Boardlarınız listelendiğinde isminin yer altığı kısma tıklayak ilgili board içerisine girebilir burada var olan listelerinizi görüntüleyebilir eğer hiç listeniz yoksa yeni listeler yaratabilirsiniz. Aynı zamanda ilgili listede bulunan dropdown menüden yardım alarak liste adı değiştirme veya silme işlemlerini gerçekleştirebilirsiniz.

> Navbar menü üzerinde yer alan çıkış yap butonunu kullanarak kullanıcı hesabından çıkış yapabilirsiniz.

> Bir board içerisine girdiğinizde navbar menü üzerinde yer alan **Kanban Board App** başlığına tıklayarak kişiye ait boardların listelendiği ekrana dönüş yapabilirsiniz.

### :x: Eksikler

- Listeler içerisine kart işlemleri yapılmadı
- Drag and Drop yapılmadı
- Kullanıcılar arası paylaşım işlemleri yapılmadı

![image](https://user-images.githubusercontent.com/77509002/196746046-6b02c747-795c-4d41-a75a-c7f57196d6c9.png)
![image](https://user-images.githubusercontent.com/77509002/196746521-c6493a19-a8a2-4332-bf34-05c8f9ac9d9e.png)
![image](https://user-images.githubusercontent.com/77509002/197002175-26c359a0-da81-4b14-9f5d-33332716e1fa.png)
![image](https://user-images.githubusercontent.com/77509002/197002290-993098ee-d71d-41d8-97a4-12bd67328987.png)
