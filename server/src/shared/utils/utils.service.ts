import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UtilsService {
  constructor(private readonly configService: ConfigService) {}

  public createAlertResponse(message: string) {
    return `
      <html>
        <body>
          <script type="text/javascript">
            alert('${message}');
            window.close();
          </script>
        </body>
      </html>
    `;
  }

  public createValidationButton(token: string) {
    return `
      <div style="text-align: center;">
        <div style="margin-top: 20px;">
          <a href="${this.configService.get<string>("url")}/user/validateEmail/${token}">
            <button 
              style="background-color: #000; color: white; border: none; padding: 10px 20px; font-size: 16px; border-radius: 10px; cursor: pointer;">
              VALIDAR CONTA
            </button>
          </a>
        </div>
      </div>
    `;
  }
}
