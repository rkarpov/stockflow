# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'

User.destroy_all
Stock.destroy_all
Transaction.destroy_all

# add stocks to database
nasdaq_csv_text = File.read(Rails.root.join('lib', 'seeds', 'nasdaq.csv'))
nasdaq_csv = CSV.parse(nasdaq_csv_text, :headers => true, :encoding => 'ISO-8859-1')
nasdaq_csv.each do |row|
  s = Stock.new
  s.ticker_symbol = row['Symbol']
  s.company_name = row['Name']
  s.save
end

nyse_csv_text = File.read(Rails.root.join('lib', 'seeds', 'nyse.csv'))
nyse_csv = CSV.parse(nyse_csv_text, :headers => true, :encoding => 'ISO-8859-1')
nyse_csv.each do |row|
  s = Stock.new
  s.ticker_symbol = row['Symbol']
  s.company_name = row['Name']
  s.save
end