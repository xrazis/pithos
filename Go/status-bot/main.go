package main

import (
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
	"log"
	"regexp"
)

func main() {
	var slice []string

	bot, err := tgbotapi.NewBotAPI("TELEGRAM_TOKEN")
	if err != nil {
		log.Panic(err)
	}

	bot.Debug = true

	log.Printf("Authorized on account %s", bot.Self.UserName)

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates, err := bot.GetUpdatesChan(u)

	for update := range updates {
		if update.Message == nil {
			continue
		}

		if update.CallbackQuery != nil {
			bot.AnswerCallbackQuery(tgbotapi.NewCallback(update.CallbackQuery.ID, update.CallbackQuery.Data))

			bot.Send(tgbotapi.NewMessage(update.CallbackQuery.Message.Chat.ID, update.CallbackQuery.Data))
		}

		log.Printf("[%s] %s", update.Message.From.UserName, update.Message.Text)

		msg := tgbotapi.NewMessage(update.Message.Chat.ID, "")

		if update.Message.IsCommand() {
			switch update.Message.Command() {
			case "start":
				msg.Text = "Check your domain status! Use the following commands:\n\n" +
					"/add http://example.com, to add a domain to the list\n" +
					"/remove http://example.com, to remove a domain from the list\n" +
					"/domains, list your domains\n" +
					"/prune, prune your domains\n" +
					"/status, to check the status of your domains\n"
			case "help":
				msg.Text = "/add domain-name\n" +
					"/remove domain-name\n" +
					"/domains\n" +
					"/prune\n" +
					"/status\n"
			case "add":
				domain := update.Message.CommandArguments()
				matched, _ := regexp.Match(`http://.*`, []byte(domain))

				if !matched {
					msg.Text = "Please provide a valid url!"
				} else {
					slice = append(slice, domain)
					msg.Text = "Domain added!"
				}
			case "remove":
				slice = removeFromSlice(slice, update.Message.CommandArguments())
				msg.Text = "Domain removed!"
			case "domains":
				msg.Text = "Your domains:\n"
				for i := range slice {
					msg.Text += slice[i] + "\n"
				}
			case "prune":
				msg.Text = "Pruned the domain list!"
				slice = nil
			case "status":
				slice := linkService(slice)
				msg.Text = "Your domains status:\n"

				for i := range slice {
					msg.Text += slice[i] + "\n"
				}
			default:
				msg.Text = "I don't know that command, use /start or /help."
			}
		}

		if _, err := bot.Send(msg); err != nil {
			log.Panic(err)
		}
	}
}

func removeFromSlice(slice []string, item string) []string {
	for i, s := range slice {
		if s == item {
			slice = append(slice[:i], slice[i+1:]...)
		}
	}

	return slice
}

func keyboard(list []string) tgbotapi.InlineKeyboardMarkup {
	var ik []tgbotapi.InlineKeyboardButton

	for i := range list {
		ik = append(ik, tgbotapi.NewInlineKeyboardButtonData(list[i], list[i]))
	}

	lk := tgbotapi.NewInlineKeyboardMarkup(ik)
	return lk
}
