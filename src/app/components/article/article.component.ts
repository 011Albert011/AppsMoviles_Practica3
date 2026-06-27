import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { StorageService } from 'src/app/services/storage';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  standalone: false
})
export class ArticleComponent implements OnInit {
  @Input() article!: Article;
  @Input() $index!: number;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private storageService: StorageService
  ) { }

  ngOnInit() {}

  async openArticle() {
    await Browser.open({ url: this.article.url });
  }

  async onOpenMenu() {
    const articleInFavorites = this.storageService.articleInFavorites(this.article);

    const buttons: ActionSheetButton[] = [
      {
        text: 'Compartir',
        icon: 'share-outline',
        handler: () => {
          this.onShareArticle();
        }
      },
      {
        text: articleInFavorites ? 'Remover de favoritos' : 'Favorito',
        icon: articleInFavorites ? 'heart' : 'heart-outline',
        handler: () => {
          this.onToggleFavorite();
        }
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel'
      }
    ];

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: buttons
    });
    await actionSheet.present();
  }

  async onShareArticle() {
    await Share.share({
      title: this.article.title,
      text: this.article.description || '',
      url: this.article.url,
      dialogTitle: 'Compartir noticia',
    });
  }

  onToggleFavorite() {
    this.storageService.saveRemoveArticle(this.article);
  }

}
