import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesForLab } from './messages.lab';
import { MessageService } from '../../services/message/message.service';

describe('2-message component testing:', () => {

  let component: MessagesForLab;
  let fixture: ComponentFixture<MessagesForLab>;
  let messageService: MessageService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [MessagesForLab],
      providers: [MessageService]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesForLab);
    component = fixture.componentInstance;

    messageService = TestBed.inject(MessageService);

    fixture.detectChanges();

  });

  it('expect component template to be empty', () => {

    fixture.detectChanges();

    const msgs = fixture.nativeElement.querySelectorAll('.msg');

    expect(msgs.length).toBe(0);

  });

  it('then expect div.msg to have the messages after setting it', () => {

    messageService.add('First Message');
    messageService.add('Second Message');

    fixture.detectChanges();

    const msgs = fixture.nativeElement.querySelectorAll('.msg');

    expect(msgs.length).toBe(2);

    expect(msgs[0].textContent).toContain('First Message');
    expect(msgs[1].textContent).toContain('Second Message');

  });

});