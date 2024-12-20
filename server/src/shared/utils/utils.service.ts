import { Injectable } from "@nestjs/common";

@Injectable()
export class UtilsService {
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
}
