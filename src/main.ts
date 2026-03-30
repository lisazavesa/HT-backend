import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: "http://localhost:5173",
        credentials: true,
    });

    const config = new DocumentBuilder()
        .setTitle("Habits Tracker API")
        .setDescription("API для трекера привычек")
        .setVersion("1.0")
        .addCookieAuth("accessToken")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );
    app.use(cookieParser());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
