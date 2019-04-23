# require 'byebug' # debugger usable only if no other debuggers in controller
module TransactionService
  module Builder
    def self.call(stock, params, balance)
      purchase_amt = params[:stock_price].to_f * params[:num_shares].to_i
      purchase_amt = ActiveSupport::NumberHelper.number_to_rounded(purchase_amt, precision: 2).to_f
      net_asset_value = params[:net_asset_value].to_f + purchase_amt
      net_asset_value = 0 if net_asset_value < 0
      net_stock_value = params[:net_stock_value].to_f + purchase_amt
      
      transaction = {}
      transaction["purchase_amt"] = purchase_amt
      transaction["net_asset_value"] = Currency.get_amount(net_asset_value)
      transaction["net_stock_value"] = Currency.get_amount(net_stock_value)
      transaction["net_stock_shares"] = params[:num_shares].to_i + params[:net_stock_shares].to_i
      transaction["errors"] = self.errors(stock, params, purchase_amt, balance)
      return transaction
    end

    # helper method for building error msgs
    def self.errors(stock, params, purchase_amt, balance)
      errors = {}
      errors["tickerSymbol"] = 'Invalid stock symbol' if !stock
      errors["tickerSymbol"] = 'Symbol cannot be blank' if params[:stock_symbol] == ""
      errors["balance"] = 'Not enough funds' if purchase_amt > balance
      errors["numShares"] = 'Amount cannot be blank' if params[:num_shares].to_f == 0
      errors["numShares"] = 'Amount must be a whole number' if params[:num_shares].to_f % 1 != 0
      if params[:transaction_type] == "sell" && params[:num_shares].to_f.abs > params[:net_stock_shares].to_f
         errors["numShares"] = "You've not enough shares"
      end
      return errors
    end

    def self.stock_performance(transaction, params)
      open_price = IEX::API.fetch_open_price(params[:stock_symbol])
      performance = open_price <=> params[:stock_price].to_f
      return performance
    end
  end
end