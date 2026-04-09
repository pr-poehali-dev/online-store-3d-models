import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с формы обратной связи на почту владельца магазина."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    message = body.get('message', '').strip()

    if not name or not phone or not message:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните все поля'})
        }

    email_to = os.environ.get('EMAIL_TO', '')

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 12px;">
      <div style="background: linear-gradient(135deg, #7c3aed, #f97316); padding: 20px 24px; border-radius: 8px; margin-bottom: 24px;">
        <h1 style="color: white; margin: 0; font-size: 22px;">🐾 ПетТег — новая заявка</h1>
      </div>
      <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 120px;">Имя</td>
            <td style="padding: 10px 0; color: #111827; font-weight: 600; font-size: 16px;">{name}</td>
          </tr>
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Телефон</td>
            <td style="padding: 10px 0; color: #7c3aed; font-weight: 600; font-size: 16px;">{phone}</td>
          </tr>
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Сообщение</td>
            <td style="padding: 10px 0; color: #111827; font-size: 15px; line-height: 1.6;">{message}</td>
          </tr>
        </table>
      </div>
      <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 16px;">
        Заявка с сайта ПетТег — адресники и 3D-модели для питомцев
      </p>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'🐾 Новая заявка от {name} — ПетТег'
    msg['From'] = 'noreply@poehali.dev'
    msg['To'] = email_to
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP('smtp.poehali.dev', 587) as server:
        server.sendmail('noreply@poehali.dev', email_to, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
